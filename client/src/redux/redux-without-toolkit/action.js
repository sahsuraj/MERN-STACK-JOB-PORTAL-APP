import {
  JOB_ADD_TO_CART,
  JOB_EMPTY_CART,
  JOB_REMOVE_FROM_CART,
  JOB_INCREMENT_CARD,
  JOB_DECREMENT_CARD
} from "./constant";

export const ActionJobAddToCart = (data) => {
  console.warn("job action is called", data);
  return {
    type: JOB_ADD_TO_CART,
    data
  };
};

export const ActionJobRemoveToCart = (data) => {
  console.warn("job action removeToCart", data);
  return {
    type: JOB_REMOVE_FROM_CART,
    data
  };
};

export const ActionjobIncrementQ = (data) => {
  console.warn("job action INCREMENNT");
  return {
    type: JOB_INCREMENT_CARD,
    data
  };
};

export const ActionjobDecrementQ = (data) => {
  console.warn("job action decrement");
  return {
    type: JOB_DECREMENT_CARD,
    data
  };
};

export const ActionJobEmptyCart = () => {
  console.warn("job action emptyCart");
  return {
    type: JOB_EMPTY_CART
  };
};
