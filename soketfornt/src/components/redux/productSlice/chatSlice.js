import { createSlice } from "@reduxjs/toolkit"
import { alluser, user } from "../actions/Actions"



const initialState={
    chatarr:[],
    userarr:[],
    loading:true,
}



const chatsslice=createSlice({
    name:"chatsvalue",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        .addCase(alluser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(alluser.fulfilled,(state,action)=>{
            state.loading=false;
            state.chatarr=action.payload;
        })
        .addCase(alluser.rejected,(state)=>{
            state.loading=false
        })
        builder
        .addCase(user.pending,(state)=>{
            state.loading=true;
        })
        .addCase(user.fulfilled,(state,action)=>{
            state.loading=false;
            state.userarr=action.payload;
        })
        .addCase(user.rejected,(state)=>{
            state.loading=false;
        })
    }
})

export const chatstate=(state)=>state.chatsvalue
export default chatsslice.reducer;