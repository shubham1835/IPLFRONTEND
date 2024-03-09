import axios from 'axios'
import { SERVER_URI } from "config"
export const BID_DATA = 'BID_DATA'


export const makeBid = async (payload) => {
    console.log('[bid payload]', payload);
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + '/app/v1/ipl/bid', payload, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}