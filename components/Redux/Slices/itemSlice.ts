import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "types";

const initialState: CartItem[] = [];

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        getItems: (state, action:PayloadAction<CartItem[]>)=>{
                return action.payload
        }
  
    },
  });

  export const {getItems} = itemSlice.actions
  export default itemSlice.reducer