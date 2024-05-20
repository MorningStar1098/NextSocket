import { createSlice } from "@reduxjs/toolkit";
import { paymentproduct } from "../actions/Actions";

const initialState = {
  checkoutproductsarr:[],
  loading: true,
};

const checkoutproducts = createSlice({
  name: "checkoutpay",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(paymentproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutproductsarr = action.payload;
      })
      .addCase(paymentproduct.rejected, (state) => {
        state.loading = false;
      });
      
  },
});

export const checkoutstate = (state) => state?.checkoutpay;

export default checkoutproducts.reducer;
// const data = Object.entries(metaData).map(([key, value]) => {
  // const modifiedKey = key.replace(/(^|_)[a-z]/g, (match) => match.toUpperCase());
//   return `"-metadata", "${modifiedKey}=${value}"`;
// });

// console.log(data);

// const data=Object.entries(metaData).map(([key,value])=>{
//     // "-metadata", "${key}=${value}"
//     return "-metadata" +','+`${key}=${value}`
// })