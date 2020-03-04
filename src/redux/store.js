import {createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension'
import cusReducer from './cusReducer'

export default createStore(cusReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))
