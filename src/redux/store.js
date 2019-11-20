import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';


const reducer = combineReducers({
  
});

export default createStore(reducer, applyMiddleware(promiseMiddleware));