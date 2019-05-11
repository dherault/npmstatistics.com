import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

import packages from './reducers/packages'

const reducer = combineReducers({
  packages,
})

function loggerMiddleware() {
  return next => action => {
    console.log('Action', action.type, action.payload)

    return next(action)
  }
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const middlewares = []

if (process.env.NODE_ENV === 'development') middlewares.push(loggerMiddleware)

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(reducer, {}, enhancer)

export default store
