import { GET_MATCH_LIST } from "../actions/IplAction"

const initialState = {
    states: {},
}

const IPLReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_MATCH_LIST: {
            return {
                ...state,
                matches: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default IPLReducer