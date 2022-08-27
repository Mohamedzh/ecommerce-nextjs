import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "types";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            console.log(action.payload)

            let newCartItem = { ...action.payload, quantity: 1 }
            state.push(newCartItem)
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            return state.filter(item => item.id !== action.payload.id)
        },
        appendQty: (state, action: PayloadAction<{ id: string, qty: number }>) => {
            let item = state.find(x => x.id === action.payload.id)
            if (item) {
                [...state, item.quantity = action.payload.qty]
            }
        }

    },
});

export const { addToCart, removeFromCart, appendQty } = cartSlice.actions
export default cartSlice.reducer