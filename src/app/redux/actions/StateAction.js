import { SERVER_URI } from "config"
import axios from 'axios'
export const GET_STATE_DATA = 'GET_STATE_DATA'

export const getStates = () => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/merchant/states', { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: GET_STATE_DATA,
            payload: res.data,
        })
    })
}