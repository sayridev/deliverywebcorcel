import React, {useContext} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {collection, getDocs, limit, query, where} from 'firebase/firestore';
import {createContext, useEffect, useReducer} from 'react';
import {auth, db} from '../../firebase/firebase';
import {IUser} from '../../interface/IUser';
import {IUserApp, TypeAdmin} from '../../interface/IUserApp';
import {authReducer, AuthState} from './AuthReducer';
import {Collection, FirebaseContext} from '../firebase/FirebaseContext';
import {SnackBarContext} from '../snackBar/SnackBarContext';
import {TYPEALERT} from '../snackBar/SnackBarReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from 'react-native-google-signin';

GoogleSignin.configure({
  webClientId:
    '362462088754-isoqp6qebhieb1kj7fm3ga4rfmd6lmc2.apps.googleusercontent.com',
  offlineAccess: true,
  forceConsentPrompt: true,
});

type AuthContextProps = {
  errorMessage: string;
  user: User | null;
  userApp: IUserApp | null;
  photo: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  checking: boolean;
  sigIn: (data: IUser) => void;
  logout: () => void;
  registerUser: (data: IUser) => Promise<string>;
  SignInGoogle: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  user: null,
  errorMessage: '',
  checking: true,
  photo: null,
  userApp: null,
};

export const AuthContext = createContext({} as AuthContextProps);
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const {getDatabyParam, createCollection} = useContext(FirebaseContext);
  const {openF} = useContext(SnackBarContext);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async user => {
      if (user !== null) {
        await promiseSigIn(user);
      } else {
        dispatch({
          type: 'notAuthenticated',
        });
      }
    });
    unsuscribe();
  }, []);

  useEffect(() => {
    const signInToken = async () => {
      const user = await GoogleSignin.getCurrentUser();
      if (user != null) {
        dispatch({
          type: 'signIn',
          payload: {
            user: {} as User,
            photo: user.user.photo!,
            userApp: (await getDocFirebase(
              user.user.id,
              Collection.Users,
            )) as IUserApp,
          },
        });
      } else {
        dispatch({
          type: 'notAuthenticated',
        });
      }
    };

    signInToken();
  }, []);

  const promiseSigIn = async (user: User) => {
    dispatch({
      type: 'signIn',
      payload: {
        user: user,
        photo: null,
        userApp: (await getDocFirebase(user.uid, Collection.Users)) as IUserApp,
      },
    });
  };

  const sigIn = async ({email, password}: IUser) => {
    try {
      const existe = await getDatabyParam(Collection.Users, 'username', email);

      if (existe !== 1) {
        return openF('El usuario no existe', 2000, TYPEALERT.DANGER);
      }
      const response = await signInWithEmailAndPassword(auth, email, password);
      const result = await getDocFirebase(response.user.uid, Collection.Users);
      openF('Session Iniciada Correctamente', 1000, TYPEALERT.SUCCESS);
      dispatch({
        type: 'signIn',
        payload: {
          photo: null,
          user: response.user,
          userApp: result as IUserApp,
        },
      });
    } catch (error) {
      dispatch({
        type: 'notAuthenticated',
      });
      return openF('Credenciales incorrectas', 2000, TYPEALERT.DANGER);
    }
  };

  const registerUser = async ({email, password}: IUser): Promise<string> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return response.user.uid;
    } catch (error) {
      return '';
    }
  };

  const logout = async () => {
    await signOut(auth);
    await GoogleSignin.signOut();
    dispatch({
      type: 'logout',
    });
  };

  const SignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      const result = await getDocFirebase(user.id, Collection.Users);
      let userSave: IUserApp = {} as IUserApp;
      userSave.uid = user.id;
      userSave.name = user.name!;
      userSave.type = TypeAdmin.Customer;
      userSave.username = user.email;
      if (!result) {
        await createCollection(Collection.Users, userSave);
      }
      openF('Session Iniciada Correctamente', 2000, TYPEALERT.SUCCESS);
      const userApp = await getDocFirebase(user.id, Collection.Users);
      await AsyncStorage.setItem('token', accessToken!);
      dispatch({
        type: 'signIn',
        payload: {
          photo: user.photo,
          user: {} as User,
          userApp: userApp as IUserApp,
        },
      });
    } catch (error) {
      return openF('Session no iniciada', 2000, TYPEALERT.DANGER);
    }
  };

  const getDocFirebase = async (id: string, collectionDB: Collection) => {
    const q = query(
      collection(db, collectionDB),
      where('uid', '==', id),
      limit(1),
    );
    const result = await getDocs(query(q));
    const doc = result.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    });
    return doc[0];
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        sigIn,
        registerUser,
        logout,
        SignInGoogle,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
