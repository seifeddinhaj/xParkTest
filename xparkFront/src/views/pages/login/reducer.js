import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        loading: false,
      }
    case LOGIN_FAIL:
      return { ...state }

    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
