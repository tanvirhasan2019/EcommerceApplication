import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ERROR
} from "../actions/locations";

const location = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return { isFetching: true };
    case FETCH_LOCATION_SUCCESS:
      return { data: action.data, isFetching: false };
    case FETCH_LOCATION_ERROR:
      return { err: action.err, isFetching: false };
    default:
      return state;
  }
};

export default location;
