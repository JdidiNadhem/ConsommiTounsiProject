import axios from "axios";

import {
  LOAD_PURCHASE,
  GET_PURCHASES,
  FAIL_PURCHASE,
} from "../Constants/purchasesConstants";

export const get_purchases = () => async (dispatch) => {
  dispatch({ type: LOAD_PURCHASE });
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/client/get_purchases", config); //msg purshases

    dispatch({ type: GET_PURCHASES, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PURCHASE, payload: error.response.data.errors });
  }
};

export const purchase_products = (
  products,
  total,
  shippingadress,
  cartnumber,
  cvv
) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_PURCHASE });
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    await axios.post(
      `/api/client/purchase/`,
      { products, total, shippingadress, cartnumber, cvv },
      config
    ); //msg

    dispatch(get_purchases());
  } catch (error) {
    dispatch({ type: FAIL_PURCHASE, payload: error.response.data.errors });
  }
};

export const delete_purchase = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PURCHASE });
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    console.log(config);
    await axios.delete(`/api/client/delete_purchase/${id}`, config); //msg
    dispatch(get_purchases());
  } catch (error) {
    dispatch({ type: FAIL_PURCHASE, payload: error.response.data.errors });
  }
};
