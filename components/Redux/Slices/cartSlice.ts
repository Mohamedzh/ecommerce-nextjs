import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "types";


interface AddedItem {
    product: Product
    color: string
    size: string
    availableQty: string
}
const initialState: CartItem[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddedItem>) => {
            let newCartItem = { ...action.payload.product, quantity: 1, color: action.payload.color, size: action.payload.size }
            let item = state.find(x => x.id === action.payload.product.id && x.size === action.payload.size && x.color === action.payload.color)
            console.log(item)
            console.log(newCartItem)
            if (item) {
                if (item.quantity < +(action.payload.availableQty)){
                [...state, item.quantity = item.quantity + 1]
            }else{alert('maximum allowable quantity reached')}
            } else {
                state.push({ ...action.payload.product, quantity: 1, color: action.payload.color, size: action.payload.size })
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            let index = state.indexOf(action.payload)
            state.splice(index, 1)
            // return state.filter(item => item.id !== action.payload.id)
        },
        appendQty: (state, action: PayloadAction<{ id: string, qty: number }>) => {
            let item = state.find(x => x.id === action.payload.id)
            if (item) {
                [...state, item.quantity = action.payload.qty]
            }
        },
        emptyCart: (state) => {
            []
        }

    },
});

export const { addToCart, removeFromCart, appendQty, emptyCart } = cartSlice.actions
export default cartSlice.reducer