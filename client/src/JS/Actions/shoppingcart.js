import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_SHOPPINGCART,
} from "../Constants/shoppingcartConstants";

export const add_to_cart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const delete_from_cart = (id, product) => {
  return {
    type: DELETE_FROM_CART,
    payload: { id, product },
  };
};

export const clear_shopping_cart = () => {
  return {
    type: CLEAR_SHOPPINGCART,
  };
};
