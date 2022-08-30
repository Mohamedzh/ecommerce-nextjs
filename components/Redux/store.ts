import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import cartSlice from './Slices/cartSlice'
import itemSlice from './Slices/itemSlice'
import currentItemSlice from './Slices/currentItemSlice'
import qtySlice from './Slices/qtySlice'


export const store = configureStore({
  reducer: {
    cart: cartSlice,
    item: itemSlice,
    currentItem: currentItemSlice,
    qty: qtySlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const wrapper = createWrapper<RootState>(store);
