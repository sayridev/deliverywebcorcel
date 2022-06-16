import {IDetailOrder, IOrder} from '../../interface/IOrder';
import {IProduct} from '../../interface/IProduct';
import {IUserApp} from '../../interface/IUserApp';

export interface ShoppingState {
  order: IOrder;
}

type ActionShopping =
  | {type: 'AddProduct'; payload: {product: IProduct; amount: number}}
  | {type: 'DeleteProduct'; payload: {id: string}}
  | {type: 'UpdateProduct'; payload: {id: string; amount: number}}
  | {
      type: 'UpdateOrder';
      payload: {user: IUserApp; sucursal: string; address: string};
    }
  | {type: 'ClearOrder'};
export const shoppingReducer = (
  state: ShoppingState,
  action: ActionShopping,
): ShoppingState => {
  let fecha = new Date();

  switch (action.type) {
    case 'AddProduct':
      return {
        ...state,

        order: {
          send: false,
          delivered: false,
          status: true,
          user: {} as IUserApp,
          orders: addProduct(
            state.order.orders,
            action.payload.product,
            action.payload.amount,
          ),
          delivery: '',
          sucursal: '',
          address: '',
          time: 0,
          date: '',
          total: addProduct(
            state.order.orders,
            action.payload.product,
            action.payload.amount,
          ).reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.total!,
            0,
          ),
        },
      };
    case 'DeleteProduct':
      return {
        ...state,
        order: {
          send: false,
          delivered: false,

          status: true,
          user: {} as IUserApp,
          orders: state.order.orders.filter(
            detail => detail.product?.id !== action.payload.id,
          ),
          delivery: '',
          sucursal: '',
          address: '',
          time: 0,
          date: '',
          total: state.order.orders
            .filter(detail => detail.product?.id !== action.payload.id)
            .reduce(
              (previus, currentValue) => previus + currentValue.total!,
              0,
            ),
        },
      };
    case 'UpdateProduct':
      return {
        ...state,
        order: {
          send: false,
          delivered: false,
          status: true,
          user: {} as IUserApp,
          orders: updateProduc(
            state.order.orders,
            action.payload.id,
            action.payload.amount,
          ),
          delivery: '',
          sucursal: '',
          time: 0,
          address: '',
          date: '',
          total: updateProduc(
            state.order.orders,
            action.payload.id,
            action.payload.amount,
          ).reduce((previus, currentValue) => previus + currentValue.total!, 0),
        },
      };
    case 'UpdateOrder':
      return {
        ...state,
        order: {
          ...state.order,
          user: action.payload.user,
          date: fecha.toLocaleDateString(),
          status: true,
          send: false,
          delivered: false,
          sucursal: action.payload.sucursal,
          address: action.payload.address,
        },
      };
    case 'ClearOrder':
      return {
        ...state,
        order: {orders: [] as IDetailOrder} as IOrder,
      };
    default:
      return state;
  }
};

const addProduct = (
  details: IDetailOrder[],
  product: IProduct,
  amount: number,
): IDetailOrder[] => {
  let existe = false;
  details.length > 0 &&
    details.map(detail => {
      if (detail.product!.id === product.id) {
        existe = true;
      }
    });
  if (existe) {
    return details;
  }
  return [
    ...details,
    {
      product,
      amount,
      total: product.price * amount,
    },
  ];
};

const updateProduc = (
  details: IDetailOrder[],
  id: string,
  amount: number,
): IDetailOrder[] => {
  let existe = false;
  details.length > 0 &&
    details.map(detail => {
      if (detail.product!.id === id) {
        detail.amount = amount;
        detail.total = detail.product?.price! * amount;
      }
    });

  return details;
};
