import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzaExtra } from "../../types/pizza-item";
import { TSortBy } from "./filterSlice";

export type SearchPizzaParams = {
  category: string, 
  sortBy: TSortBy | string,  
  order: string, 
  search: string, 
  currentPage: string, 
}
export const fetchPizzas = createAsyncThunk<IPizzaExtra[], SearchPizzaParams>(
  "pizzas/fetchPizzasStatus",
  async (params ) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<IPizzaExtra[]>(
      `https://62efe09657311485d12a2ac3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
  
    return data 
  }
);

interface IInitialState {
  items: IPizzaExtra[],
  status: 'loading' | 'success' | 'error'
}

const initialState: IInitialState = {
  items: [],
  status: 'loading', //"loading | success | error"
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    })
    
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    })
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
