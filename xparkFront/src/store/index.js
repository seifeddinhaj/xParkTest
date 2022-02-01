import { combineReducers } from 'redux'
import changeState from '../components/SwitchToggleReducer'
import authLogin from '../views/pages/login/reducer.js'
import StateReducer from '../views/modules/States/reducer'
import VehicleReducer from '../views/modules/Vehicles/Vehicles/reducer'

const combined = combineReducers({
  changeState: changeState,
  authLogin: authLogin,
  StateReducer: StateReducer,
  VehicleReducer: VehicleReducer,
})
export default combined
