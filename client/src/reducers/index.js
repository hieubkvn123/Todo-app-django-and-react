import { combineReducers } from 'redux'
import authReducer  from './authReducer'
import msgReducer from './msgReducer'
import itemReducer from './itemReducer'

export default combineReducers({
        auth : authReducer,
        msg : msgReducer,
        items : itemReducer
})