import axios from 'axios'
import { SERVER_URI } from "config"
export const GET_INVOICE_DATA = 'GET_INVOICE_DATA'
export const GET_PO_DATA_LIST = 'GET_PO_DATA_LIST'
export const GET_INVOICE_LIST = 'GET_INVOICE_LIST'
export const GET_INVOICE_NUMBER = 'GET_INVOICE_NUMBER'
export const GET_PO_DATA = 'GET_PO_DATA'
export const GET_UPDATE_PRODUCT = 'GET_UPDATE_PRODUCT'
export const SET_CART_PRODUCT = 'SET_CART_PRODUCT'

export const setInvoiceData = async (invoiceData) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.post(SERVER_URI + '/app/v1/merchant/invoice/generate', invoiceData, { headers: { "Authorization": "Bearer " + accessToken } })
    invoiceData['invoiceNumber'] = res.data
    dispatch({
        type: GET_INVOICE_DATA,
        payload: invoiceData,
    })
}

export const setPOData = async (purchaseOrderData) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.post(SERVER_URI + '/app/v1/merchant/po/generate', purchaseOrderData, { headers: { "Authorization": "Bearer " + accessToken } })
    purchaseOrderData['poNumber'] = res.data
    dispatch({
        type: GET_PO_DATA,
        payload: purchaseOrderData,
    })
}

export const getInvoiceList = () => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/merchant/invoice/invoiceList', { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log('[Invoice List res]' + res.data)
        dispatch({
            type: GET_INVOICE_LIST,
            payload: res.data,
        })
    })
}

export const getPurchaseOrderList = () => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/merchant/po/poList', { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_PO_DATA_LIST,
            payload: res.data,
        })
    })
}

export const setInvoiceNumber = (invoiceNumber) => {
    return {
        type: GET_INVOICE_NUMBER,
        payload: invoiceNumber,
    }
}


export const setUpdateProduct = (productDetails) => {
    return {
        type: GET_UPDATE_PRODUCT,
        payload: productDetails
    }
}


export const updateProductData = async (productData) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.patch(SERVER_URI + '/inventoryservice/v1/item',
    productData, { headers: { "Authorization": "Bearer " + accessToken } })
    return res;
}



export const setCartProduct = (cartProduct) => {
    return {
        type: GET_UPDATE_PRODUCT,
        payload: cartProduct
    }
}


export const addCartProductData = async (carttData) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.patch(SERVER_URI + '/inventoryservice/v1/item',
    carttData, { headers: { "Authorization": "Bearer " + accessToken } })
    return res;
}
