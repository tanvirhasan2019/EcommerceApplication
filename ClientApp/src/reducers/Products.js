import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR
} from "../actions/Products";

const Products = (state = {}, action) => {
    console.log("Product reducer is called");
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                data: action.data,
              //  ProductImage:action.data2,
                isLoading: false
            };
        case FETCH_PRODUCTS_ERROR:
            return { err: action.err, isLoading: false };
        default:
            return state;
    }
};

export default Products;
