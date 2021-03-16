import axios from "axios";

import authService from '../components/api-authorization/AuthorizeService';

export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_ERROR = "FETCH_ORDER_ERROR";


export const order =()=> async dispatch => {
    await dispatch({ type: FETCH_ORDER_REQUEST});
    try {
        const token = await authService.getAccessToken();
        const response = await fetch('Product/GetSingleOrderItem', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
      
        return dispatch({
            type: FETCH_ORDER_SUCCESS,
            data: response.data,           
        });
    } catch (err) {
        return dispatch({ type: FETCH_ORDER_ERROR, err});
    }
};


export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";

export const orders = () => async dispatch => {
    await dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
        
       
        const response = await axios.get(
            "Product/AllOrderList"
        );
        return dispatch({
            type: FETCH_ORDERS_SUCCESS,
            data: response.data
          
        });
    } catch (err) {
        return dispatch({ type: FETCH_ORDERS_ERROR, err });
    }
};






