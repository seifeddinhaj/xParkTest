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
import { toast } from 'react-toastify';

import { httpClient } from '../../../service/httpClient'
export const loadStates = () => async (dispatch) => {
  try {
    const res = await httpClient.get('states')
    dispatch({
      type: GET_STATE_SUCCESS,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: GET_STATE_FAILED,
      payload: e,
    })
  }
}

export const deleteStates = (payload) => async (dispatch) => {

  try {
    await httpClient.delete(`states/${payload}`)
    dispatch({
      type: DELETE_STATE_SUCCESS,
      payload: payload,
    })
    dispatch(loadStates())
    return true
  } catch (error) {
    toast.error(error.response.data.message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    dispatch({ type: DELETE_STATE_FAILED })
    return false
  }
}

export const addState = (payload) => async (dispatch) => {
  try {
    const res = await httpClient.post('states', payload)
    dispatch({
      type: ADD_STATE_SUCCESS,
      payload: res.data,
    })
    dispatch(loadStates())
    console.log('res', res.data)
  } catch (error) {
    dispatch({ type: ADD_STATE_FAILED })
    toast.error(error.response.data.message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    return false
  }
}
export const modifyState = (payload, id) => async (dispatch) => {
  try {
    const res = await httpClient.patch(`states/${id}`, payload)
    dispatch({
      type: EDIT_STATE_SUCCESS,
      payload: res.data,
    })
    dispatch(loadStates())
    return res
  } catch (err) {
    console.log(err.response.data)
    toast.error(err.response.data.message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    dispatch({ type: EDIT_STATE_FAILED })
    return false
  }
}
