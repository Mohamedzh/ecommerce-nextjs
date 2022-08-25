import axios from 'axios'
import { getCurrentItem } from 'components/Redux/Slices/currentItemSlice'
import { Dispatch } from 'redux'
import { getItems } from '../Redux/Slices/itemSlice'

export const getProducts = async (dispatch: Dispatch) => {
    try {
        const res = await axios.get('http://localhost:3000/api/items')
        dispatch(getItems(res.data.data.items))
    } catch (error) {
        console.log(error)
    }
}

export const getProductDetails = async(id: string, dispatch:Dispatch)=>{
    try {
        const res = await axios.get(`http://localhost:3000/api/items/${id}`)
        console.log(res.data.currentProduct)
        dispatch(getCurrentItem(res.data.currentProduct))
    } catch (error) {
        console.log(error)
    }
}