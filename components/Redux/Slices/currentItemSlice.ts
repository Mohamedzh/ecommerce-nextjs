import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "types";

const initialState = {};

export const currentItemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        getCurrentItem: (state, action: PayloadAction<Product>) => {
            return action.payload
        }
    },
});

export const { getCurrentItem } = currentItemSlice.actions
export default currentItemSlice.reducer