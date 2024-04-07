import { combineReducers } from 'redux';
import PersonReducer from './Reducer/PersonReducer';

let rootReducer = combineReducers({
    PersonRecord: PersonReducer
});

export default rootReducer;