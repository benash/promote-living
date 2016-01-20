import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import mainReducer from './reducers'
import App from './app'
import { el } from './helpers'

let store = createStore(mainReducer)

render(
    el(Provider, { store },
        el(App)),
    document.getElementById('root')
)
