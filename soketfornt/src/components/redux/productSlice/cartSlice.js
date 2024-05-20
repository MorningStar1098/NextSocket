import {  createSlice } from "@reduxjs/toolkit";
import { cartadd } from "../actions/Actions";

const initialState = {
  addtocartslice:[],
  loading: true,
};



const cartslice = createSlice({
  name: "carts",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartadd.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartadd.fulfilled, (state, action) => {
        state.loading = false;
        state.addtocartslice = action.payload;
      })
      .addCase(cartadd.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const cartState = (state) => state?.carts;


export default cartslice.reducer;
