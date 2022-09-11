import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortOptions } from "components/Data/data";
import { DetailedProduct, SortOption } from "types";

const initialState: { sortOptions: SortOption[], current: string, currentProducts: DetailedProduct[] } = { sortOptions, current: '', currentProducts: [] };

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        changeCurrent: (state, action: PayloadAction<SortOption>) => {
            let currentOption = state.sortOptions.find(option => option.name === action.payload.name)
            if (currentOption) {
                currentOption.current = !currentOption.current
                state.sortOptions.filter(option => option !== currentOption).map(option => option.current = false)
                state.current = currentOption.name


                if (currentOption.name === 'Price: Low to High') {
                    state.currentProducts.sort((a, b) => Number(a.price) - Number(b.price))
                } else if (currentOption.name === 'Price: High to Low') {
                    state.currentProducts.sort((a, b) => Number(b.price) - Number(a.price))
                } else if (currentOption.name === 'Best Rating') {
                    state.currentProducts.sort((a, b) => Number(b.rating) - Number(a.rating))
                } else {
                    state.currentProducts
                }
            }
        },
        addCurrentProducts: (state, action: PayloadAction<DetailedProduct[]>) => {
            state.currentProducts = action.payload
        }
    },
});

export const { changeCurrent, addCurrentProducts } = sortSlice.actions
export default sortSlice.reducer