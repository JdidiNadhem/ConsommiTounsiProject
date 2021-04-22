import {
  LOAD_PRODUCTS,
  GET_ALL_PRODUCTS,
  FAIL_PRODUCTS,
  GET_PRODUCT,
} from "../Constants/productsConstants";

// InitialState

const InitialState = {
  Products: [],
  Product: null,
  loadProducts: false,
  errors: [],
};

// PURE FUNCTION

const productsReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        loadProducts: true,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        Products: payload.products,
        loadProducts: false,
        errors: [],
      };
    case GET_PRODUCT:
      return {
        ...state,
        Product: payload.product,
        loadProducts: false,
        errors: [],
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
