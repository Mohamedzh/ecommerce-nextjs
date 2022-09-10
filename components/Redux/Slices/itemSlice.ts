import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedProduct } from "types";

const initialState: DetailedProduct[] = [];

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        getItems: (state, action:PayloadAction<DetailedProduct[]>)=>{
                return action.payload
        }
  
    },
  });

  export const {getItems} = itemSlice.actions
  export default itemSlice.reducer