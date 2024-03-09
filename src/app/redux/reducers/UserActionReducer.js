import { GET_STORE_LIST, GET_EMPLOYEE_LIST, GET_QR_DATA, GET_SELECTED_USER_DATA } from "../actions/UserAction"

const initialState = {
    customerList: [],
    employeeList: [],
    qrData: '',
    selectedUser: {}
}

const UserActionReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_STORE_LIST: {
            return {
                ...state,
                customerList: [...action.payload],
            }
        }
        case GET_EMPLOYEE_LIST: {
            return {
                ...state,
                employeeList: [...action.payload],
            }
        }
        case GET_QR_DATA: {
            return {
                ...state,
                qrData: action.payload,
            }
        }
        case GET_SELECTED_USER_DATA: {
            return {
                ...state,
                selectedUser: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default UserActionReducer