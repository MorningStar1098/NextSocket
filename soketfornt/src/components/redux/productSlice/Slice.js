import { createSlice } from "@reduxjs/toolkit";
import { datatype } from "../actions/Actions";

const initialState = {
  getproducts: [],
  loading: true,
};

const productsslice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(datatype.pending, (state) => {
        state.loading = true;
      })
      .addCase(datatype.fulfilled, (state, action) => {
        state.loading = false;
        state.getproducts = action.payload;
      })
      .addCase(datatype.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const dataState = (state) => state?.products;

export default productsslice.reducer;
