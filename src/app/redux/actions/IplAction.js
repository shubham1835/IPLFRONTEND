import { SERVER_URI } from "config"
import axios from 'axios'
export const GET_MATCH_LIST = 'GET_MATCH_LIST'

export const getMatches = () => (dispatch) => {
    console.log('called getMatches');
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + '/app/v1/ipl/matchList', { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log('getting match loist');
        dispatch({
            type: GET_MATCH_LIST,
            payload: res.data,
        })
    })
}