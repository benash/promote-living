import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import mainReducer from './reducers'
import App from './app'
import { el } from './helpers'

const loggerMiddleware = createLogger()

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
