import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; //auth data
import alertReducer from "./features/alertSlice"; //alert data
import apiReducer from "./saga/apiSlice"; // saga third party api data
const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  apis: apiReducer
  // Add more reducers as needed
});

export default rootReducer;
