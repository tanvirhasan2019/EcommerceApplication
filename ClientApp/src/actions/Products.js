import axios from "axios";

import authService from '../components/api-authorization/AuthorizeService';

/*export const FETCH_PRODUCT_REQUEST = "FETCH_CHARACTER_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_CHARACTER_SUCCESS";
export const FETCH_PRODUCT_ERROR = "FETCH_CHARACTER_ERROR";

export const fetchCharacter = id => async dispatch => {
    await dispatch({ type: FETCH_CHARACTER_REQUEST, id });
    try {
        const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${id}`
        );
        return dispatch({
            type: FETCH_CHARACTER_SUCCESS,
            data: response.data,
            id
        });
    } catch (err) {
        return dispatch({ type: FETCH_CHARACTER_ERROR, err, id });
    }
};
*/
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export const fetchProducts = () => async dispatch => {
    await dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
       
     /*   const productList = await axios.get(
            "Product/GetProducts"
        )

      
        return dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            data: payload */
        const response = await axios.get(
            "Product/GetProducts"
        );
        return dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            data: response.data.data
          
        });
    } catch (err) {
        return dispatch({ type: FETCH_PRODUCTS_ERROR, err });
    }
};


/*export const FETCH_PERSONS_REQUEST = "FETCH_PERSONS_REQUEST";
export const FETCH_PERSONS_SUCCESS = "FETCH_PERSONS_SUCCESS";
export const FETCH_PERSONS_ERROR = "FETCH_PERSONS_ERROR";

export const fetchPersons = () => async dispatch => {
    await dispatch({ type: FETCH_PERSONS_REQUEST });
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        return dispatch({
            type: FETCH_PERSONS_SUCCESS,
            data: response.data
        });
    } catch (err) {
        return dispatch({ type: FETCH_PERSONS_ERROR, err });
    }
};*/




