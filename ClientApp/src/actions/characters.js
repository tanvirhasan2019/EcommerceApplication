import axios from "axios";

export const FETCH_CHARACTER_REQUEST = "FETCH_CHARACTER_REQUEST";
export const FETCH_CHARACTER_SUCCESS = "FETCH_CHARACTER_SUCCESS";
export const FETCH_CHARACTER_ERROR = "FETCH_CHARACTER_ERROR";

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

export const FETCH_CHARACTERS_REQUEST = "FETCH_CHARACTERS_REQUEST";
export const FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS";
export const FETCH_CHARACTERS_ERROR = "FETCH_CHARACTERS_ERROR";

export const fetchCharacters = () => async dispatch => {
  await dispatch({ type: FETCH_CHARACTERS_REQUEST });
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    return dispatch({
      type: FETCH_CHARACTERS_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_CHARACTERS_ERROR, err });
  }
};


export const FETCH_PERSONS_REQUEST = "FETCH_PERSONS_REQUEST";
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
};




