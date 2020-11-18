import axios from "axios";

export const FETCH_LOCATION_REQUEST = "FETCH_LOCATION_REQUEST";
export const FETCH_LOCATION_SUCCESS = "FETCH_LOCATION_SUCCESS";
export const FETCH_LOCATION_ERROR = "FETCH_LOCATION_ERROR";

export const fetchLocation = ({ id, url }) => async dispatch => {
  await dispatch({ type: FETCH_LOCATION_REQUEST });
  try {
    const response = await axios.get(
      url || `https://rickandmortyapi.com/api/location/${id}`
    );
    return dispatch({ type: FETCH_LOCATION_SUCCESS, data: response.data });
  } catch (err) {
    return dispatch({ type: FETCH_LOCATION_ERROR, err });
  }
};
