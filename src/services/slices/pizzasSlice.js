import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(
      `https://62efe09657311485d12a2ac3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: 'loading', //"loafing | success | error"
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading'
      // Add user to the state array
      console.log("Идет запрос")
      console.log(fetchPizzas)
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload
      console.log("Данные получены")

    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
      console.log("Ошибка!")
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
