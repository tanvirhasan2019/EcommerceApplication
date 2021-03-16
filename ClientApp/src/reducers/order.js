import {
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_ERROR
} from "../actions/Orders";

const order = (state = {}, action) => {
    console.log("Order reducer is called");
    switch (action.type) {
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case FETCH_ORDER_ERROR:
            return { err: action.err, isLoading: false };
        default:
            return state;
    }
};

export default order;
