export const GET_VEHICLE_SUCCESS = 'Get_Vehicle_success'
export const GET_VEHICLE_FAILED = 'Get_Vehicle_failed'
export const ADD_VEHICLE_SUCCESS = 'add_Vehicle_success'
export const ADD_VEHICLE_FAILED = 'add_Vehicle_failed'
export const EDIT_VEHICLE_SUCCESS = 'edit_Vehicle_success'
export const EDIT_VEHICLE_FAILED = 'edit_Vehicle_failed'
export const DELETE_VEHICLE_SUCCESS = 'delete_Vehicle_success'
export const DELETE_VEHICLE_FAILED = 'delete_Vehicle_failed'
const initialstate = {
  vehicles: [],
  isEmpty: true,
}
const VehicleReducer = (state = initialstate, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: payload,
        isEmpty: false,
      }
    case GET_VEHICLE_FAILED:
      return {
        ...state,
      }

    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: state.vehicles.filter((vehicle) => vehicle.id !== payload),
        isEmpty: false,
      }
    case DELETE_VEHICLE_FAILED:
      return {
        ...state,
      }
    case ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: [...state.vehicles, payload],
      }
    case EDIT_VEHICLE_SUCCESS:
      return {
        ...state,
        vehicles: state.vehicles.map((vehicle) => (vehicle.id === payload.id ? payload : vehicle)),
      }
    case EDIT_VEHICLE_FAILED:
      return {
        ...state,
      }

    default:
      return state
  }
}
export default VehicleReducer
