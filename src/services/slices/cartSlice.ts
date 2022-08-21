import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IPizzaExtra, IPizzaItem} from '../../types/pizza-item'

interface IInitialState {
  items: IPizzaItem[],
  totalCount: number,
  totalPrice: number,
}

const initialState: IInitialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
 
    addItem(state, action: PayloadAction <IPizzaItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
          
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },

    decreaseCount(state, action: PayloadAction <string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if(findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price
      }
    },

    removeItem(state, action: PayloadAction <string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = initialState.totalPrice
    },
  },
});

export const selectCart = (state: any) => state.cart
// Action creators are generated for each case reducer function
export const { addItem, removeItem, decreaseCount, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
