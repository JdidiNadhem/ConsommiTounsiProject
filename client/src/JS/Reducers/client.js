import {
  CLEAR_ERRORS,
  CURRENT_CLIENT,
  FAIL_CLIENT,
  LOAD_CLIENT,
  LOGIN_CLIENT,
  LOGOUT_CLIENT,
  REGISTER_CLIENT,
} from "../Constants/clientConstants";

// InitialState

const InitialState = {
  Client: null,
  loadClient: false,
  isAuth: false,
  errors: [],
};

// PURE FUNCTION

const clientReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case LOAD_CLIENT:
      return { ...state, loadClient: true };
    case LOGIN_CLIENT:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        Client: payload.Client,
        loadClient: false,
        isAuth: true,
        errors: [],
      };
    case REGISTER_CLIENT:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        Client: payload.Client,
        loadClient: false,
        isAuth: true,
        errors: [],
      };
    case CURRENT_CLIENT:
      return {
        ...state,
        loadClient: false,
        Client: payload,
        isAuth: true,
        errors: [],
      };
    case FAIL_CLIENT:
      return {
        ...state,
        Client: null,
        loadClient: false,
        errors: payload,
      };
    case LOGOUT_CLIENT:
      localStorage.removeItem("token");
      return {
        ...state,
        loadClient: false,
        errors: [],
        Client: null,
        isAuth: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
};

export default clientReducer;
