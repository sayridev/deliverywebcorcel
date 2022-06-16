import React, {createContext, useContext, useReducer} from 'react';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';

import {db} from '../../firebase/firebase';
import {SnackBarContext} from '../snackBar/SnackBarContext';
import {TYPEALERT} from '../snackBar/SnackBarReducer';
import {firebaseReducer, FirebaseState} from './FirebaseReducer';
interface FirebaseContextProps {
  orders: string[];
  clearMyOrder: () => void;
  createCollection: (collectionDB: Collection, data: object) => void;
  updateCollection: (
    collectionDB: Collection,
    data: object,
    id: string,
  ) => void;
  deleteCollection: (collectionDB: Collection, id: string) => void;
  getData: (collectionDB: Collection) => Promise<any>;
  getDatabyParam: (
    collectionDB: Collection,
    field: string,
    value: string,
  ) => Promise<any>;
}

export enum Collection {
  Users = 'users',
  Categories = 'categories',
  Stores = 'stores',
  Products = 'products',
  Orders = 'orders',
  Reviews = 'reviews',
}

const FirebaseInitialState: FirebaseState = {
  orders: [],
};

export const FirebaseContext = createContext({} as FirebaseContextProps);

export const FirebaseProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const {openF} = useContext(SnackBarContext);
  const [state, dispatch] = useReducer(firebaseReducer, FirebaseInitialState);
  const createCollection = async (collectionDB: Collection, data: object) => {
    const collectionRef = collection(db, collectionDB);
    try {
      const {id} = await addDoc(collectionRef, data);
      switch (collectionDB) {
        case Collection.Users:
          openF(
            'El usuario se registro correctamente',
            2000,
            TYPEALERT.SUCCESS,
          );
          break;
        case Collection.Orders:
          dispatch({
            type: 'AddOrders',
            payload: {
              id,
            },
          });
          break;
      }
    } catch (error) {
      openF('Error desconocido!', 2000, TYPEALERT.DANGER);
    }
  };

  const updateCollection = async (
    collectionDB: Collection,
    data: object,
    id: string,
  ) => {
    try {
      const collectionDoc = doc(db, collectionDB, id);
      const newFields = data;
      await updateDoc(collectionDoc, newFields);
    } catch (error) {}
  };

  const deleteCollection = async (collectionDB: Collection, id: string) => {
    try {
      const collectionDoc = doc(db, collectionDB, id);
      await deleteDoc(collectionDoc);
    } catch (error) {}
  };

  const getData = async (collectionDB: Collection) => {
    const itemsCollection = collection(db, collectionDB);
    const result = await getDocs(query(itemsCollection));
    return result.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    });
  };
  const getDatabyParam = async (
    collectionDB: Collection,
    field: string,
    value: string,
  ) => {
    const itemsCollection = collection(db, collectionDB);
    const result = await getDocs(
      query(itemsCollection, where(field, '==', value), limit(1)),
    );

    return result.docs.length;
  };
  const clearMyOrder = () => {
    dispatch({
      type: 'ClearOrders',
    });
  };
  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        updateCollection,
        createCollection,
        deleteCollection,
        getData,
        getDatabyParam,
        clearMyOrder,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};
