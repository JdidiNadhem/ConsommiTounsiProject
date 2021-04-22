import axios from "axios";

import {
  LOAD_ADMIN,
  GET_CLIENTS,
  FAIL_ADMIN,
  GET_SUPPLIERS,
  GET_ADMIN_PRODUCTS,
} from "../Constants/adminConstants";

// *************************
// CLIENTS
// *************************

export const get_clients = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/api/admin/get_clients"); //msg clients

    dispatch({ type: GET_CLIENTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const delete_client = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.delete(`/api/admin/delete_client/${id}`); //msg

    dispatch(get_clients());
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

// *************************
// SUPPLIERS
// *************************

export const get_suppliers = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/api/admin/get_suppliers"); //msg suppliers

    dispatch({ type: GET_SUPPLIERS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

export const initialize_suppliers = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    await axios.put(`/api/admin/initialise_supplier/${id}`); //msg

    dispatch(get_suppliers());
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};

// *************************
// PRODUCTS
// *************************

export const get_admin_products = () => async (dispatch) => {
  dispatch({ type: LOAD_ADMIN });
  try {
    const result = await axios.get("/api/admin/get_products"); //msg products

    dispatch({ type: GET_ADMIN_PRODUCTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ADMIN, payload: error.response.data.errors });
  }
};
