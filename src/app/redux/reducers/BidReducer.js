import { BID_DATA, USER_BID_DATA, MATCH_BID_DATA } from "../actions/BidAction"

const initialState = {
    states: {},
}

const BidReducer = function (state = initialState, action) {
    switch (action.type) {
        case BID_DATA: {
            return {
                ...state,
                bids: action.payload,
            }
        }
        case USER_BID_DATA: {
            return {
                ...state,
                userBids: action.payload,
            }
        }
        case MATCH_BID_DATA: {
            return {
                ...state,
                matchBids: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default BidReducer