import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR
} from '../actions/characters'

const character = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false
      }
    case FETCH_CHARACTER_ERROR:
      return { ...state, err: action.err, isLoading: false }
    default:
      return state
  }
}

// export default character;

/*import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR
} from '../actions/characters'

const character = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        [action.id]: { ...state[action.id], isLoading: true }
      }
    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          data: action.data,
          isLoading: false
        }
      }
    case FETCH_CHARACTER_ERROR:
      return { ...state, [action.id]: { err: action.err, isLoading: false } }
    default:
      return state
  }
} */

export default character
