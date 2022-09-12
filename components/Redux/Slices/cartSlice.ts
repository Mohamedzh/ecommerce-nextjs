import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedProduct, Product } from "types";


interface AddedItem {
    product: DetailedProduct
    color: string
    size: string
    availableQty: string
}
const initialState: DetailedProduct[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<AddedItem>) => {
            let newCartItem = {
                ...action.payload.product,
                quantity: 1,
                color: action.payload.color,
                size: action.payload.size
            }
            let item = state.find(x => x.id === action.payload.product.id
                && x.size === action.payload.size
                && x.color === action.payload.color)
            console.log(item)
            console.log(newCartItem)
            if (item) {
                if (item.quantity < +(action.payload.availableQty)) {
                    [...state, item.quantity = item.quantity + 1]
                } else { alert('maximum allowable quantity reached for this variant') }
            } else {
                if (action.payload.availableQty === '0') {
                    alert('no stock available for this variant')
                } else {
                    state.push({ ...action.payload.product, quantity: 1, color: action.payload.color, size: action.payload.size })
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<DetailedProduct>) => {
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
        },
    },
});

export const { addToCart, removeFromCart, appendQty, emptyCart } = cartSlice.actions
export default cartSlice.reducer