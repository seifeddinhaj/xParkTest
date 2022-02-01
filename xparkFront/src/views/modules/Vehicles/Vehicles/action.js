import {
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_FAILED,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILED,
  EDIT_VEHICLE_FAILED,
  EDIT_VEHICLE_SUCCESS,
  GET_VEHICLE_FAILED,
  GET_VEHICLE_SUCCESS,
} from './types'
import { httpClient } from '../../../../service/httpClient'
import { toast } from 'react-toastify';

export const loadVehicles = () => async (dispatch) => {
  try {
    const res = await httpClient.get('vehicles')
    dispatch({ type: GET_VEHICLE_SUCCESS, payload: res.data })
  } catch (e) {
    dispatch({ type: GET_VEHICLE_FAILED })
  }
}

export const deleteVehicle = (payload) => async (dispatch) => {
  try {
    const res = await httpClient.delete(`vehicles/${payload}`)
    dispatch({ type: DELETE_VEHICLE_SUCCESS, payload: payload })
  } catch (e) {
    toast.error(err.response.data.message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    dispatch({ type: DELETE_VEHICLE_FAILED })
  }
}

export const addVehicle = (payload) => async (dispatch) => {
  try {
    const res = await httpClient.post('vehicles', payload)
    dispatch({ type: ADD_VEHICLE_SUCCESS, payload: res.data })
  } catch (e) {
    dispatch({ type: ADD_VEHICLE_FAILED })
  }
}

export const modifyVehicle = (payload, id) => async (dispatch) => {
  try {
    const res = await httpClient.patch(`vehicles/${id}`, payload)
    dispatch({
      type: EDIT_VEHICLE_SUCCESS,
      payload: res.data,
    })
  } catch (e) {
    console.log(e.response.data.message)
    toast.error(e.response.data.message,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    dispatch({
      type: EDIT_VEHICLE_FAILED,
    })
  }
}
