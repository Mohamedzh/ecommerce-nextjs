import axios from 'axios'
import { appendQty } from 'components/Redux/Slices/cartSlice'
// import { getCurrentItem } from 'components/Redux/Slices/currentItemSlice'
import { Dispatch } from 'redux'
import { DetailedProduct, reqBody } from 'types'
import { getItems } from '../Redux/Slices/itemSlice'

export const getProducts = async (dispatch: Dispatch) => {
    try {
        const res = await axios.get('http://localhost:3000/api/items')
        dispatch(getItems(res.data))
    } catch (error) {
        console.log(error)
    }
}

// export const getProductDetails = async (id: string, dispatch: Dispatch) => {
//     try {
//         const res = await axios.get(`http://localhost:3000/api/items/${id}`)
//         dispatch(getCurrentItem(res.data.currentProduct))
//     } catch (error) {
//         console.log(error)
//     }
// }

export const subtotal = (arr: DetailedProduct[]) => {
    let total = 0
    arr.map(item => total += (Number(item.price) * Number(item.quantity)))
    return total
}

export const updateItemQty = (id: string, qty: number, dispatch: Dispatch) => {
    dispatch(appendQty({ id, qty }))

}

export const saveOrder = async (reqBody: reqBody, form: { email: string, orderId: string }) => {
    try {
        console.log(reqBody)
        await axios.post('http://localhost:3000/api/orders', reqBody)
        await axios.post('http://localhost:3000/api/email', form)
    } catch (error) {
        console.log(error)
    }


}

export const sendOrderEmail = async (form: { email: string, orderId: string }) => {
    try {
        console.log('test')
        await axios.post('http://localhost:3000/api/email', form)
    } catch (error) {
        console.log(error)
    }
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}