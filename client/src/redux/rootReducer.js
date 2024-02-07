import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; //auth data
import alertReducer from "./features/alertSlice"; //alert data
import apiReducer from "./saga/apiSlice"; // saga third party api data
import cartReducer from "./saga/Cart/cartSlice";
import productReducer from "./saga/Cart/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  apis: apiReducer,
  cart: cartReducer,
  product: productReducer
  // Add more reducers as needed
});

export default rootReducer;
