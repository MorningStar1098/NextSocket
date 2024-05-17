import { configureStore } from "@reduxjs/toolkit";
import productsslice from "../redux/productSlice/Slice";
import cartSlice from "./productSlice/cartSlice";
import checkoutproducts from "./productSlice/paymentproductslice";
import chatsslice from "./productSlice/chatSlice";

const store = configureStore({
  reducer: {
    products: productsslice,
    carts: cartSlice,
    checkoutdata: checkoutproducts,
    getchats: chatsslice,
  },
});

export default store;
