export interface FirebaseState {
  orders: string[];
}

type FirebaseAction =
  | {type: 'AddOrders'; payload: {id: string}}
  | {type: 'ClearOrders'};

export const firebaseReducer = (
  state: FirebaseState,
  action: FirebaseAction,
): FirebaseState => {
  switch (action.type) {
    case 'AddOrders':
      return {
        ...state,
        orders: [...state.orders, action.payload.id],
      };
    case 'ClearOrders':
      return {
        ...state,
        orders: [],
      };

    default:
      return state;
  }
};
