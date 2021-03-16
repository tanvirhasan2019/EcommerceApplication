import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR
} from "../actions/Orders";

const orders = (state = {}, action) => {
    console.log("Order reducer is called");
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case FETCH_ORDERS_ERROR:
            return { err: action.err, isLoading: false };
        default:
            return state;
    }
};

export default orders;
