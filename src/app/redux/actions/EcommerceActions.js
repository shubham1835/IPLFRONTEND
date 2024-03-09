import axios from 'axios'
import { SERVER_URI } from "config"
export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST'
export const GET_CART_LIST = 'GET_CART_LIST'
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST'
export const GET_RATING_LIST = 'GET_RATING_LIST'
export const GET_BRAND_LIST = 'GET_BRAND_LIST'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART'

export const UPDATE_CART_AMOUNT = 'UPDATE_CART_AMOUNT'

export const getProductList = (storeId) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/inventoryservice/v1/item', { params: { 'storeId': storeId }, headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_PRODUCT_LIST,
            payload: res.data,
        })
    }).catch((exception) => {
        dispatch({
            type: GET_PRODUCT_LIST,
            payload: [],
        })
    }
    )
}
export const getCategoryList = (storeId) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/inventoryservice/v1/category', { params: { 'storeId': storeId }, headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
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
    await axios.post(SERVER_URI + '/inventoryservice/v1/item',
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

export const getRatingList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-rating-list').then((res) => {
        dispatch({
            type: GET_RATING_LIST,
            payload: res.data,
        })
    })
}

export const getBrandList = () => (dispatch) => {
    axios.get('/api/ecommerce/get-brand-list').then((res) => {
        dispatch({
            type: GET_BRAND_LIST,
            payload: res.data,
        })
    })
}

export const getCartList = (uid) => (dispatch) => {
    axios.get('/api/ecommerce/get-cart-list', { data: uid }).then((res) => {
        dispatch({
            type: GET_CART_LIST,
            payload: res.data,
        })
    })
}

export const addProductToCart = (uid, productId) => (dispatch) => {
    axios.post('/api/ecommerce/add-to-cart', { uid, productId }).then((res) => {
        console.log(res.data)
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: res.data,
        })
    })
}

export const deleteProductFromCart = (uid, productId) => (dispatch) => {
    axios
        .post('/api/ecommerce/delete-from-cart', { uid, productId })
        .then((res) => {
            dispatch({
                type: DELETE_PRODUCT_FROM_CART,
                payload: res.data,
            })
        })
}

export const updateCartAmount = (uid, productId, amount) => (dispatch) => {
    console.log(uid, productId, amount)
    axios
        .post('/api/ecommerce/update-cart-amount', { uid, productId, amount })
        .then((res) => {
            dispatch({
                type: UPDATE_CART_AMOUNT,
                payload: res.data,
            })
        })
}

export const deleteCategoryValue = async (category, storeID) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.delete(SERVER_URI + '/inventoryservice/v1/category/'+storeID,
     { params: { 'category':category }, headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeID));
    return res;
}

export const deleteProductValue = async (category, productName, storeID) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.delete(SERVER_URI + '/inventoryservice/v1/item/'+storeID,
     { params: { category,productName } , headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeID));
    return res;
}

export const deleteVariantValue = async (category, productName, variant, storeID) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.delete(SERVER_URI + '/inventoryservice/v1/item/'+storeID+'/variant',
     { params: { category, productName, variant } , headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeID));
    return res;
}

export const addNewVariant = async (variantData, storeId) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    const res = await axios.post(SERVER_URI + `/inventoryservice/v1/item/${storeId}/variant`,
    variantData, { headers: { "Authorization": "Bearer " + accessToken } })
    dispatch(getProductList(storeId));
    return res;
}
