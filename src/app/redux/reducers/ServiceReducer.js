import {
    GET_SERVICE_LIST,
    GET_CATEGORY_LIST
} from '../actions/ServiceAction'

const initialState = {
    productList: [],
    cartList: [],
    categoryList: []
}

const ServiceReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_LIST: {
            return {
                ...state,
                serviceList: [...action.payload],
            }
        }
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: [...action.payload],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default ServiceReducer
