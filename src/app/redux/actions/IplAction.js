import { SERVER_URI } from "config"
import axios from 'axios'
export const GET_MATCH_LIST = 'GET_MATCH_LIST'
export const GET_TEAM_LIST = 'GET_TEAM_LIST'

export const getMatches = (user) => (dispatch) => {
    console.log('called getMatches');
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + `/app/v1/ipl/matchList/${user}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log('getting match loist');
        dispatch({
            type: GET_MATCH_LIST,
            payload: res.data,
        })
    })
}

export const postMatches = async (payload) => {
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + `/app/v1/ipl/match`, payload, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}

export const getTeams = (subscription) => (dispatch) => {
    console.log('called getMatches');
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(SERVER_URI + `/app/v1/ipl/teams/${subscription}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        console.log('getting match loist');
        dispatch({
            type: GET_TEAM_LIST,
            payload: res.data,
        })
    })
}