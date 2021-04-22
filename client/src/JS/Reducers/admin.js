// InitialState

import {
  FAIL_ADMIN,
  GET_CLIENTS,
  LOAD_ADMIN,
  GET_SUPPLIERS,
  GET_ADMIN_PRODUCTS,
} from "../Constants/adminConstants";

const InitialState = {
  Clients: null,
  Suppliers: null,
  Products: null,
  loadadmin: false,
  errors: [],
};

// PURE FUNCTION

const adminReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOAD_ADMIN:
      return {
        ...state,
        loadadmin: true,
      };
    case GET_CLIENTS:
      return {
        ...state,
        Clients: payload.clients,
        loadadmin: false,
      };
    case GET_SUPPLIERS:
      return {
        ...state,
        Suppliers: payload.suppliers,
      };

    case GET_ADMIN_PRODUCTS:
      return {
        ...state,
        Products: payload.products,
      };
    case FAIL_ADMIN:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
