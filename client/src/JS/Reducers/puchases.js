import {
  LOAD_PURCHASE,
  GET_PURCHASES,
  FAIL_PURCHASE,
} from "../Constants/purchasesConstants";

// InitialState

const InitialState = {
  Purchases: [],
  loadPurchases: false,
  errors: [],
};

// PURE FUNCTION

const purchasesReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOAD_PURCHASE:
      return {
        ...state,
        loadPurchases: true,
      };
    case GET_PURCHASES:
      return {
        ...state,
        Purchases: payload.purshases,
        loadPurchases: false,
        errors: [],
      };
    case FAIL_PURCHASE:
      return {
        ...state,
        errors: payload,
      };

    default:
      return state;
  }
};

export default purchasesReducer;
