  import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  searchValue:  '',
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort= action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)

    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setCategoryId, 
  setSort, 
  setCurrentPage, 
  setFilters, 
  setSearchValue} = filterSlice.actions

export default filterSlice.reducer