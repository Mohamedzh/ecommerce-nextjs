import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedProduct, Product } from "types";

const initialState: Product = {
    id: '',
    name: '',
    href: '',
    color: '',
    price: '',
    availableQty: '',
    imageSrc: '',
    imageAlt: '',
    description: '',
    details: ''
};

export const currentItemSlice = createSlice({
    name: "currentItem",
    initialState,
    reducers: {
        setCurrentItemId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        }
    },
});

export const { setCurrentItemId } = currentItemSlice.actions
export default currentItemSlice.reducer