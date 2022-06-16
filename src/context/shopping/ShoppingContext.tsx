import React, {createContext, useReducer} from 'react';
import {IDetailOrder, IOrder} from '../../interface/IOrder';
import {IProduct} from '../../interface/IProduct';
import {IUserApp} from '../../interface/IUserApp';
import {shoppingReducer, ShoppingState} from './ShoppingReducer';

interface ShoppingContextProps {
  order: IOrder;
  addProduct: (product: IProduct, amount: number) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, amount: number) => void;
  updateOrder: (user: IUserApp, sucursal: string, address: string) => void;
  clearOrder: () => void;
}

const initialShoppingState: ShoppingState = {
  order: {orders: [] as IDetailOrder} as IOrder,
};

export const ShoppingContext = createContext({} as ShoppingContextProps);

export const ShoppingProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialShoppingState);
  const addProduct = (product: IProduct, amount: number) => {
    dispatch({
      type: 'AddProduct',
      payload: {
        product,
        amount,
      },
    });
  };
  const deleteProduct = (id: string) => {
    dispatch({
      type: 'DeleteProduct',
      payload: {
        id,
      },
    });
  };
  const updateProduct = (id: string, amount: number) => {
    dispatch({
      type: 'UpdateProduct',
      payload: {id, amount},
    });
  };

  const updateOrder = (user: IUserApp, sucursal: string, address: string) => {
    dispatch({
      type: 'UpdateOrder',
      payload: {
        user,
        sucursal,
        address,
      },
    });
  };
  const clearOrder = () => {
    dispatch({
      type: 'ClearOrder',
    });
  };
  return (
    <ShoppingContext.Provider
      value={{
        ...state,
        addProduct,
        deleteProduct,
        updateProduct,
        updateOrder,
        clearOrder,
      }}>
      {children}
    </ShoppingContext.Provider>
  );
};
