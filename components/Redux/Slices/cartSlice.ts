import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "types";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<CartItem>)=>{
                state.push(action.payload)
        }
  
    },
  });

  export const {addToCart} = cartSlice.actions
  export default cartSlice.reducer