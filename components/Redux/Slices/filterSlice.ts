import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedProduct } from "types";

const initialState = { price: '', color: '', size: '', category: '' };

export const filterSlice = createSlice({
    name: "item",
    initialState,
    reducers: {

    },
});

export const {  } = filterSlice.actions
export default filterSlice.reducer