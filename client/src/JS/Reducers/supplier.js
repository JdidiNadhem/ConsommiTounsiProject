import {
  LOAD_SUPPLIER,
  FAIL_SUPPLIER,
  GET_SUPPLIER,
  LOGOUT_SUPPLIER,
  CLEAR_ERRORS,
  GET_PRODUCTS,
} from "../Constants/supplierConstats";

// InitialState

const InitialState = {
  Supplier: null,
  loadSupplier: false,
  products: [],
  errors: [],
  msg: null,
};

// PURE FUNCTION

const supplierReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOAD_SUPPLIER:
      return {
        ...state,
        loadSupplier: true,
      };
    case GET_SUPPLIER:
      return {
        ...state,
        loadSupplier: false,
        Supplier: payload.clientSupplier,
        errors: [],
        msg: null,
      };
    case FAIL_SUPPLIER:
      return {
        ...state,
        loadSupplier: false,
        errors: payload,
      };
    case LOGOUT_SUPPLIER:
      return {
        ...state,
        Supplier: null,
        loadSupplier: false,
        products: [],
        errors: [],
        msg: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
      };
    default:
      return state;
  }
};
export default supplierReducer;
