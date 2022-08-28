import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "types";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            let newCartItem = { ...action.payload, quantity: 1 }
            let item = state.find(x => x.id === action.payload.id)
            if (item) {
                [...state, item.quantity = item.quantity+1]
            }else{
                state.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            return state.filter(item => item.id !== action.payload.id)
        },
        appendQty: (state, action: PayloadAction<{ id: string, qty: number }>) => {
            let item = state.find(x => x.id === action.payload.id)
            if (item) {
                [...state, item.quantity = action.payload.qty]
            }
        },
        emptyCart: (state) => {
            return []
        }

    },
});

export const { addToCart, removeFromCart, appendQty, emptyCart } = cartSlice.actions
export default cartSlice.reducer