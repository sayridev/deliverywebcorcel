import React, {createContext, useReducer} from 'react';
import {snackBarReducer, SnackBarState, TYPEALERT} from './SnackBarReducer';

interface SnackBarContextProps {
  message: string;
  duration: number;
  typeAlert: TYPEALERT;
  open: boolean;
  openF: (message: string, duration: number, typeAlert: TYPEALERT) => void;
  closeF: () => void;
}

const initialSnackBarState: SnackBarState = {
  message: '',
  duration: 0,
  open: false,
  typeAlert: TYPEALERT.ERROR,
};

export const SnackBarContext = createContext({} as SnackBarContextProps);

export const SnackBarProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(snackBarReducer, initialSnackBarState);

  const openF = (message: string, duration: number, typeAlert: TYPEALERT) => {
    dispatch({
      type: 'open',
      payload: {message, duration, typeAlert},
    });
  };
  const closeF = () => {
    dispatch({
      type: 'close',
    });
  };
  return (
    <SnackBarContext.Provider
      value={{
        ...state,
        closeF,
        openF,
      }}>
      {children}
    </SnackBarContext.Provider>
  );
};
