import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import mainReducer from './reducers'
import App from './app'
import { el } from './views/helpers'

const loggerMiddleware = createLogger({
  predicate: function(getState, action) {
    return RAILS_ENV === 'development'
  }
})

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)

let store = createStoreWithMiddleware(mainReducer)

render(
    el(Provider, { store },
        el(App)),
    document.getElementById('root')
)
