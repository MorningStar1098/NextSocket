import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addtocartget,
  details,
  getalluser,
  getmessages,
  getuser,
  productpayment,
} from "../../BaseUrl";

const token = localStorage.getItem("token");

export const cartadd = createAsyncThunk("cart", async () => {
  const res = await axios.get(addtocartget, {
    headers: { Authorization: `${token}` },
  });
  return res?.data?.products;
});


export const datatype = createAsyncThunk("details", async () => {
  const res = await axios.get(details, {
    headers: { Authorization: `${token}` },
  });
  return res?.data?.orders;
});


export const paymentproduct = createAsyncThunk("paymentproducts", async () => {
  const response = await axios.get(productpayment, {
    headers: { Authorization: `${token}` },
  });

  return response?.data?.products;
});


export const alluser = createAsyncThunk("alluser", async () => {
  const response = await axios.get(getalluser, {
    headers: { Authorization: `${token}` },
  });

  return response?.data?.userdata;
});


export const user = createAsyncThunk("user", async () => {
  const response = await axios.get(getuser, {
    headers: { Authorization: `${token}` },
  });

  return response?.data?.newuser;
});


export const getmessage=createAsyncThunk("message",async(_id)=>{
  const response=await axios.get(`${getmessages}/${_id}`,{
    headers: { Authorization: `${token}` },
  })
  return response?.data?.getallmessage
});
