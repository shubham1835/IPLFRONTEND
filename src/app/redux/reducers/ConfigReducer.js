import { GET_STATE_DATA } from "../actions/StateAction"

const initialState = {
    states: {},
}

const ConfigReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_STATE_DATA: {
            return {
                ...state,
                states: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default ConfigReducer