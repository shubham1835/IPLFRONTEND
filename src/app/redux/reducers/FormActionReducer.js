import { GET_INVOICE_DATA, GET_INVOICE_LIST, GET_PO_DATA, GET_PO_DATA_LIST, GET_UPDATE_PRODUCT, SET_CART_PRODUCT } from "../actions/FormAction"

const initialState = {
    invoiceList: [],
    poList: [],
    poData: {}
}
const FormActionReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case GET_INVOICE_DATA: {
            return { ...state, payload }
        }
        case GET_PO_DATA: {
            return {
                ...state,
                poData: payload,
            }
        }
        case GET_INVOICE_LIST: {
            return {
                ...state,
                invoiceList: [...payload],
            }
        }
        case GET_PO_DATA_LIST: {
            return {
                ...state,
                poList: [...payload],
            }
        }
        case GET_UPDATE_PRODUCT: {
            return {
                ...state,
                updateProduct: payload
            }
        }
        case SET_CART_PRODUCT: {
            return {
                ...state,
                cartProduct: payload
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default FormActionReducer;