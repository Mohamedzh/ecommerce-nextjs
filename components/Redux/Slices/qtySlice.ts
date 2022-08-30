import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:  string = '0';

export const qtySlice = createSlice({
    name: "qty",
    initialState,
    reducers: {
        updateQty: (state, action:PayloadAction<string>)=>{
                return action.payload
        }
  
    },
  });

  export const {updateQty} = qtySlice.actions
  export default qtySlice.reducer