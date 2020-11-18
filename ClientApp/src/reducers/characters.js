import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR
} from "../actions/characters";

const characters = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };
    case FETCH_CHARACTERS_ERROR:
      return { err: action.err, isLoading: false };
    default:
      return state;
  }
};

export default characters;
