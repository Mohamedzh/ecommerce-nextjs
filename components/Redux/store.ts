import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import cartSlice from './Slices/cartSlice'
import itemSlice from './Slices/itemSlice'
import currentItemSlice from './Slices/currentItemSlice'
import qtySlice from './Slices/qtySlice'
import filterSlice from './Slices/filterSlice'
import sortSlice from "./Slices/sortSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    item: itemSlice,
    currentItem: currentItemSlice,
    qty: qtySlice,
    filter: filterSlice,
    sort: sortSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const wrapper = createWrapper<RootState>(store);
