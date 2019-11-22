import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer'

const reducer = combineReducers({
    userReducer
});

export default createStore(reducer, applyMiddleware(promiseMiddleware));