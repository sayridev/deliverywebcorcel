import {User} from 'firebase/auth';
import {IUserApp} from '../../interface/IUserApp';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  errorMessage: string;
  user: User | null;
  checking: boolean;
  userApp: IUserApp | null;
  photo: string | null;
}

type AuthAction =
  | {
      type: 'signIn';
      payload: {user: User; userApp: IUserApp; photo: string | null};
    }
  | {type: 'addError'; payload: string}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        user: action.payload.user,
        userApp: action.payload.userApp,
        status: 'authenticated',
        errorMessage: '',
        photo: action.payload.photo,
        checking: false,
      };
    case 'notAuthenticated':
    case 'logout':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        photo: null,
        userApp: null,
        checking: false,
      };
    case 'addError':
      return {
        ...state,
        user: null,
        userApp: null,
        photo: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
        checking: false,
      };

    default:
      return state;
  }
};
