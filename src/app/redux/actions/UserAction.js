import { SERVER_URI } from "config"
import axios from 'axios'
export const GET_STORE_LIST = 'GET_STORE_LIST'
export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST'
export const GET_QR_DATA = 'GET_QR_DATA'
export const GET_SELECTED_USER_DATA = 'GET_SELECTED_USER_DATA'

export const setSelectedUser = (user) => (dispatch) => {
    dispatch({
        type: GET_SELECTED_USER_DATA,
        payload: user,
    })
}

export const getStoreList = () => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/merchant/storeList', { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_STORE_LIST,
            payload: res.data,
        })
    })
}
export const getEmployeeList = (userName) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/employee/employees', { params: { 'userName': userName }, headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_EMPLOYEE_LIST,
            payload: res.data,
        })
    })

}

export const generateUserQRData = async (payLoad) => async (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    console.log('user' + payLoad)
    await axios.post(SERVER_URI + '/app/v1/employee/qr', payLoad, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_QR_DATA,
            payload: res.data,
        })
    })
}