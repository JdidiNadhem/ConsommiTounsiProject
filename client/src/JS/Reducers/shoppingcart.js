import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_SHOPPINGCART,
} from "../Constants/shoppingcartConstants";

// InitialState

const InitialState = {
  products: [],
  total: 0,
};

// PURE FUNCTION

const shoppingcartReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, payload],
        total: state.total + payload.price,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        products: state.products.filter((el) => el._id !== payload.id),
        total: state.total - payload.product.price,
      };
    case CLEAR_SHOPPINGCART:
      return {
        ...state,
        products: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default shoppingcartReducer;
