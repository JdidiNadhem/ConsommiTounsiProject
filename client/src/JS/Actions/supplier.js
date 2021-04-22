import axios from "axios";
import {
  LOAD_SUPPLIER,
  FAIL_SUPPLIER,
  GET_SUPPLIER,
  LOGOUT_SUPPLIER,
  CLEAR_ERRORS,
  GET_PRODUCTS,
} from "../Constants/supplierConstats";
import { get_all_products } from "../Actions/products";

export const get_supplier = () => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // GET SUPPLIER
    const result = await axios.get("/api/supplier/get_supplier", config); //msg clientSupplier

    dispatch({ type: GET_SUPPLIER, payload: result.data });
    dispatch(get_products());
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const auth_supplier = (societyname, type, phone) => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // GET SUPPLIER
    const society = true;
    await axios.put(
      "/api/supplier/sold_authorization",
      { society, societyname, type, phone },
      config
    ); //msg clientSupplier

    dispatch(get_supplier());
    dispatch(clear_errorsSupplier());
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const get_products = () => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // GET PRODUCTS
    const result = await axios.get("/api/supplier/get_products", config); //msg products

    dispatch({ type: GET_PRODUCTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const add_product = (
  name,
  categorie,
  description,
  price,
  barcode,
  image
) => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // ADD PRODUCT
    const rating = 0;
    await axios.post(
      "/api/supplier/add_product",
      { name, categorie, description, rating, price, barcode, image },
      config
    ); //msg

    dispatch(get_products());
    dispatch(get_all_products());
    dispatch(clear_errorsSupplier());
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const delete_product = (id) => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // DELETE PRODUCT

    await axios.delete(`/api/supplier/delete_product/${id}`, config); //msg

    dispatch(get_products());
    dispatch(clear_errorsSupplier());
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const update_product = (id, modification) => async (dispatch) => {
  dispatch({ type: LOAD_SUPPLIER });
  try {
    // set token in headers
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    // DELETE PRODUCT

    await axios.put(`/api/supplier/update_product/${id}`, modification, config); //msg

    dispatch(get_products());
    dispatch(clear_errorsSupplier());
  } catch (error) {
    dispatch({ type: FAIL_SUPPLIER, payload: error.response.data.errors });
  }
};

export const logout_supplier = () => {
  return {
    type: LOGOUT_SUPPLIER,
  };
};

export const clear_errorsSupplier = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
