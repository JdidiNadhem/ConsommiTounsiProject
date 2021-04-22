import axios from "axios";

import {
  LOAD_PRODUCTS,
  GET_ALL_PRODUCTS,
  FAIL_PRODUCTS,
  GET_PRODUCT,
} from "../Constants/productsConstants";

export const get_all_products = () => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await axios.get("/api/products"); //msg products

    dispatch({ type: GET_ALL_PRODUCTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error.response.data.errors });
  }
};

export const get_product_by_id = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const result = await axios.get(`/api/products/get_product/${id}`); //msg product

    dispatch({ type: GET_PRODUCT, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error });
  }
};
