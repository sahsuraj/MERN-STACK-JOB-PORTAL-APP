import {
  JOB_ADD_TO_CART,
  JOB_INCREMENT_CARD,
  JOB_REMOVE_FROM_CART,
  JOB_DECREMENT_CARD
} from "./constant";

const defaultData = JSON.parse(localStorage.getItem("jobData")) || [];

export const jobData = (data = defaultData, action) => {
  switch (action.type) {
    case JOB_ADD_TO_CART:
      const jobCartItemIndex = data.findIndex(
        (item) => item._id === action.data._id
      );

      if (jobCartItemIndex !== -1) {
        // If the item exists in the cart, update its quantity
        const updatedItem = {
          ...data[jobCartItemIndex],
          quantity: data[jobCartItemIndex].quantity + 1 // Assuming you want to increment the quantity by 1
        };

        // Create a new array with the updated item at the same index
        const updatedState = [
          ...data.slice(0, jobCartItemIndex),
          updatedItem,
          ...data.slice(jobCartItemIndex + 1)
        ];

        // Update the local storage with the updated state
        localStorage.setItem("jobData", JSON.stringify(updatedState));

        // Return the updated state
        return updatedState;
      } else {
        const setData = [action.data, ...data];
        localStorage.setItem("jobData", JSON.stringify(setData));
        return setData;
      }

    case JOB_REMOVE_FROM_CART:
      console.warn("Job  REMOVE_FROM_CART condition ", action);
      const remainingItems = data.filter(
        (item) => item._id !== action.data._id
      );
      localStorage.removeItem("jobData");
      localStorage.setItem("jobData", JSON.stringify(remainingItems));
      return [...remainingItems];

    case JOB_INCREMENT_CARD:
      const jobItemIndex = data.findIndex(
        (item) => item._id === action.data._id
      );

      if (jobItemIndex !== -1) {
        const updatedItem = {
          ...data[jobItemIndex],
          quantity: data[jobItemIndex].quantity + 1
        };
        const updatedState = [
          ...data.slice(0, jobItemIndex),
          updatedItem,
          ...data.slice(jobItemIndex + 1)
        ];

        localStorage.setItem("jobData", JSON.stringify(updatedState));

        return updatedState;
      }
      break;
    case JOB_DECREMENT_CARD:
      const jobItemDeIndex = data.findIndex(
        (item) => item._id === action.data._id
      );

      if (jobItemDeIndex !== -1) {
        const updatedItem = {
          ...data[jobItemDeIndex],
          quantity: data[jobItemDeIndex].quantity - 1
        };
        console.log("jobItemDeIndex", ...data.slice(jobItemDeIndex + 1));
        const updatedState = [
          ...data.slice(0, jobItemDeIndex),
          updatedItem,
          ...data.slice(jobItemDeIndex + 1)
        ];

        localStorage.setItem("jobData", JSON.stringify(updatedState));

        return updatedState;
      }
      break;

    default:
      return data;
  }
};
