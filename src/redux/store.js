import { combineReducers, configureStore } from '@reduxjs/toolkit'

/**Call Reducers */
import questionReducer from './question_reducer'
import resultReducer  from './result_reducer'

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer
}) 

/** Create Store with Reducer */

export default configureStore({ reducer : rootReducer})