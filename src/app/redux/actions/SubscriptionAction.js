
import { SERVER_URI } from "config"
import axios from 'axios'
export const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS'

export const getSubscriptions = (userName) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + `/app/v1/subscription/${userName}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log('getting subscription');
        dispatch({
            type: GET_SUBSCRIPTIONS,
            payload: res.data,
        })
    })
}

export const addSubscription = async (payload) => {
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + '/app/v1/subscription/createSubscription', payload, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}