import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "types";
import { filters } from "components/Data/data";

const initialState: {
    price: Filter[], color: Filter[], size: Filter[], category: Filter[]
} = filters

export const filterSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        colorFilter: (state, action: PayloadAction<Filter>) => {
            let color = state.color.find(item => item.value === action.payload.value)
            if (color) {
                color.checked = !color.checked
            }
        },
        priceFilter: (state, action: PayloadAction<Filter>) => {
            let price = state.price.find(item => item.value === action.payload.value)
            if (price) {
                price.checked = !price.checked
            }
        },
        sizeFilter: (state, action: PayloadAction<Filter>) => {
            let size = state.size.find(item => item.value === action.payload.value)
            if (size) {
                size.checked = !size.checked
            }
        },
        categoryFilter: (state, action: PayloadAction<Filter>) => {
            let category = state.category.find(item => item.value === action.payload.value)
            if (category) {
                category.checked = !category.checked
            }
        },
        clearFilter: () => {
            return initialState
        },
    },
});
export const { colorFilter, sizeFilter, priceFilter, categoryFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer