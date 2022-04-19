import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';

import api from '~/helpers/api';
import reducers from '~/reducers';

const middlewares = [
  reduxPackMiddleware,
  thunk.withExtraArgument({ api }),
];

const storeEnhancers = [
  applyMiddleware(...middlewares),
]

const initialState = {};

export default createStore(reducers, initialState, compose(...storeEnhancers));