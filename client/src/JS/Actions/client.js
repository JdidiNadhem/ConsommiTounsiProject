import axios from "axios";

import {
  LOAD_CLIENT,
  LOGIN_CLIENT,
  FAIL_CLIENT,
  REGISTER_CLIENT,
  LOGOUT_CLIENT,
  CURRENT_CLIENT,
  CLEAR_ERRORS,
} from "../Constants/clientConstants";

import { get_supplier } from "./supplier";
import { get_product_by_id } from "./products";

export const login_Client = ({ email, password }, history) => async (
  dispatch
) => {
  dispatch({ type: LOAD_CLIENT });
  try {
    const result = await axios.post("/api/client/login", { email, password });

    dispatch({ type: LOGIN_CLIENT, payload: result.data }); //msg Client token
    dispatch(get_supplier());
    history.push("/profile");
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data.errors });
  }
};

export const register_Client = (
  { cin, fullname, phone, adress, email, password },
  history
) => async (dispatch) => {
  dispatch({ type: LOAD_CLIENT });
  try {
    const result = await axios.post("/api/client/register", {
      cin,
      fullname,
      phone,
      adress,
      email,
      password,
    }); //msg Client token
    dispatch({ type: REGISTER_CLIENT, payload: result.data });
    dispatch(clearErrors_client());
    dispatch(get_supplier());
    history.push("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_CLIENT, payload: error.response.data.errors });
  }
};

export const add_review = (id, rating, comment) => async (dispatch) => {
  dispatch({ type: LOAD_CLIENT });
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    console.log(config);
    await axios.post(
      `/api/client/add_review/${id}`,
      { rating, comment },
      config
    );
    dispatch(get_product_by_id(id));
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data.errors });
  }
};

export const currentClient = () => async (dispatch) => {
  dispatch({ type: LOAD_CLIENT });
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/client/current", config);

    dispatch({ type: CURRENT_CLIENT, payload: result.data });
    dispatch(get_supplier());
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data.errors });
  }
};

export const logout_Client = () => {
  return {
    type: LOGOUT_CLIENT,
  };
};

export const clearErrors_client = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
