import axios from 'axios'
import { SERVER_URI } from "config"
export const BID_DATA = 'BID_DATA'
export const USER_BID_DATA = 'USER_BID_DATA'
export const MATCH_BID_DATA = 'MATCH_BID_DATA'
export const AGGREGATE_BID_DATA = 'AGGREGATE_BID_DATA'


export const makeBid = async (payload) => {
    console.log('[bid payload]', payload);
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + '/app/v1/ipl/bid', payload, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}

export const callResult = async (matchId, winner) => {
    console.log('[winner]', winner);
    let accessToken = window.localStorage.getItem("accessToken");
    let apiRes;
    return await axios.post(SERVER_URI + `/app/v1/ipl/result/${matchId}/${winner}`, {}, { headers: { "Authorization": "Bearer " + accessToken } })
        .then(res => { return res })
        .catch(err => { return err.response })
}

export const getBidList = (user) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(`${SERVER_URI}/app/v1/ipl/bid/${user}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: USER_BID_DATA,
            payload: res.data,
        })
    })
}

export const getMatchBid = (match) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(`${SERVER_URI}/app/v1/ipl/bid/match/${match}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: MATCH_BID_DATA,
            payload: res.data,
        })
    })
}

export const getAggregate = (subscription) => (dispatch) => {
    let accessToken = window.localStorage.getItem("accessToken");
    axios.get(`${SERVER_URI}/app/v1/ipl/bid/subscription/${subscription}`, { headers: { "Authorization": "Bearer " + accessToken } }).then((res) => {
        dispatch({
            type: AGGREGATE_BID_DATA,
            payload: res.data,
        })
    })
}