import { combineReducers } from "redux";
import clientReducer from "./client";
import supplierReducer from "./supplier";
import productsReducer from "./products";
import shoppingcartReducer from "./shoppingcart";
import purchasesReducer from "./puchases";
import adminReducer from "./admin";
const rootReducer = combineReducers({
  clientReducer,
  supplierReducer,
  productsReducer,
  shoppingcartReducer,
  purchasesReducer,
  adminReducer,
});
export default rootReducer;
