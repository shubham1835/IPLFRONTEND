import { BID_DATA } from "../actions/BidAction"

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
        default: {
            return {
                ...state,
            }
        }
    }
}

export default BidReducer