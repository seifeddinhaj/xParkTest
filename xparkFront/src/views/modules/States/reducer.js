import {
  ADD_STATE_SUCCESS,
  ADD_STATE_FAILED,
  DELETE_STATE_FAILED,
  DELETE_STATE_SUCCESS,
  EDIT_STATE_FAILED,
  EDIT_STATE_SUCCESS,
  GET_STATE_FAILED,
  GET_STATE_SUCCESS,
} from './types'

const initialstate = {
  states: [],
  isEmpty: true,
}

const StateReducer = (state = initialstate, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_STATE_SUCCESS:
      return {
        ...state,
        states: payload,
        isEmpty: false,
      }
    case GET_STATE_FAILED:
      return {
        ...state,
      }

    case DELETE_STATE_SUCCESS:
      return {
        ...state,
        states: state.states.filter((state) => state.id !== payload),
        isEmpty: false,
      }
    case DELETE_STATE_FAILED:
      return {
        ...state,
      }
    case ADD_STATE_SUCCESS:
      return {
        ...state,
        states: [...state.states, payload],
      }
    case EDIT_STATE_SUCCESS:
      return {
        ...state,
        states: state.states.map((state) => (state.id === payload.id ? payload : state)),
      }
    case EDIT_STATE_FAILED:
      return {
        ...state,
      }

    default:
      return state
  }
}
export default StateReducer
