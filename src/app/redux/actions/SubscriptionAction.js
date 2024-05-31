import axios from 'axios'
import { SERVER_URI } from "config"
export const BID_DATA = 'BID_DATA'
export const USER_BID_DATA = 'USER_BID_DATA'
export const MATCH_BID_DATA = 'MATCH_BID_DATA'
export const AGGREGATE_BID_DATA = 'AGGREGATE_BID_DATA'


export const addSubscription = async (payload) => {
    console.log('444 2', payload);
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + '/app/v1/subscription/createSubscription', payload, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}