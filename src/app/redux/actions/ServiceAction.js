import axios from 'axios'
import { SERVER_URI } from "config"
export const GET_SERVICE_LIST = 'GET_SERVICE_LIST'
export const GET_CART_LIST = 'GET_CART_LIST'
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST'
export const GET_RATING_LIST = 'GET_RATING_LIST'

export const getProductList = (storeId) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/merchantservice/v1/item', { params: { 'storeId': storeId }, headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_SERVICE_LIST,
            payload: res.data,
        })
    }).catch((exception) => {
        dispatch({
            type: GET_SERVICE_LIST,
            payload: [],
        })
    }
    )
}
export const getCategoryList = (storeId) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/merchantservice/v1/category', { params: { 'storeId': storeId }, headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_CATEGORY_LIST,
            payload: res.data,
        })
    }).catch((exception) => {
        console.log("[CATEGORY List Exception]" + exception);
        dispatch({
            type: GET_CATEGORY_LIST,
            payload: [],
        })
    }
    )
}

export const addProductCall = async (product) => {
    let accessToken = window.localStorage.getItem("accessToken");
    await axios.post(SERVER_URI + '/merchantservice/v1/item',
        product,
        { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
}

export const addCategory = (categoryList, payload) => (dispatch) => {
    const accessToken = window.localStorage.getItem("accessToken");
    axios.put(SERVER_URI + '/inventoryservice/v1/category', payload, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log(res.data)
        categoryList.push(payload.productCategory)
        dispatch({
            type: GET_CATEGORY_LIST,
            payload: categoryList,
        })
    })
}

export const deleteCategoryValue = async (category, storeID) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.delete(SERVER_URI + '/merchantservice/v1/category/' + storeID,
        { params: { 'category': category }, headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeID));
    return res;
}

export const deleteProductValue = async (category, productName, storeID) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.delete(SERVER_URI + '/merchantservice/v1/item/' + storeID,
        { params: { category, productName }, headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeID));
    return res;
}

