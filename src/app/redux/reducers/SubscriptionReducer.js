import { GET_SUBSCRIPTIONS } from "../actions/SubscriptionAction"

const initialState = {
    states: {},
}

const SubscriptionReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SUBSCRIPTIONS: {
            return {
                ...state,
                subscriptions: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default SubscriptionReducer