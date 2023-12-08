import {combineReducers} from 'redux'
import applicationReducer from './applicationReducer'
const rootReducer = combineReducers({
    applicationReducer: applicationReducer
})
export default rootReducer;