import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  pizza: {},
  totalCount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
 
    addItem(state, action) {
      state.pizza = action.payload
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...state.pizza,
          count: 1,
          
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },

    decreaseCount(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem.count--;
      state.totalPrice -= findItem.price
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },

    clearItems(state, action) {
      state.items = [];
      state.totalPrice = initialState.totalPrice
    },
  },
});

export const selectCart = state => state.cart
// Action creators are generated for each case reducer function
export const { addItem, removeItem, decreaseCount, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
