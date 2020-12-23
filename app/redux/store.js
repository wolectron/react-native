import { createStore } from 'redux'
import sessionReducer from './sessionApp'

const store = createStore(sessionReducer)

export default store