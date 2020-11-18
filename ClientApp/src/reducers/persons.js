import {
    FETCH_PERSONS_REQUEST,
    FETCH_PERSONS_SUCCESS,
    FETCH_PERSONS_ERROR
  } from "../actions/characters";
  
  const persons = (state = {}, action) => {
    switch (action.type) {
      case FETCH_PERSONS_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      case FETCH_PERSONS_SUCCESS:
        return {
          ...state,
          data: action.data,
          isLoading: false
        };
      case FETCH_PERSONS_ERROR:
        return { err: action.err, isLoading: false };
      default:
        return state;
    }
  };
  
  export default persons;
  