import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types'
import { httpClient } from '../../../service/httpClient'

export const login =
  ({ mail, password }) =>
  async (dispatch) => {
    try {
      const res = await httpClient.post('/auth/sign_in', { email: mail, password })
      let at = 'access-token'
      const client = res?.headers.client
      const accessToken = `${res.headers?.[at]}`
      const uid = res.headers.uid
      localStorage.setItem('client', client)
      localStorage.setItem('token', accessToken)
      localStorage.setItem('uid', uid)
      localStorage.setItem('role', res?.data?.role)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    } catch (e) {
      localStorage.removeItem('token', 'uid', 'client')
      dispatch({ type: LOGIN_FAIL })
    }
  }

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('client')
  localStorage.removeItem('uid')
  dispatch({ type: LOGOUT })
}
