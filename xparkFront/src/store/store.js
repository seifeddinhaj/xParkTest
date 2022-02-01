import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import rootReducers from './index'
const initialState = {}
let middleware = [thunk, reduxLogger]

const composeEnhacer = compose(applyMiddleware(...middleware))
const store = createStore(rootReducers, initialState, composeEnhacer)
export default store
