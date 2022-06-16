export interface SnackBarState {
  message: string;
  duration: number;
  typeAlert: TYPEALERT;
  open: boolean;
}

export enum TYPEALERT {
  ERROR,
  SUCCESS,
  WARNING,
  DANGER,
  INFO,
}

type SanckBarAction =
  | {type: 'close'}
  | {
      type: 'open';
      payload: {message: string; duration: number; typeAlert: TYPEALERT};
    };
export const snackBarReducer = (
  state: SnackBarState,
  action: SanckBarAction,
): SnackBarState => {
  switch (action.type) {
    case 'close':
      return {
        ...state,
        message: '',
        open: false,
      };
    case 'open':
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        typeAlert: action.payload.typeAlert,
        open: true,
      };
    default:
      return state;
  }
};
