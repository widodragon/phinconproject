import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { createWrapper } from "next-redux-wrapper"

import reducer from './reducers';
const logger = createLogger({});
const middleware = [logger, promiseMiddleware];
const store = () => createStore(reducer, compose(applyMiddleware(...middleware)))
export const wrapper = createWrapper(store);
