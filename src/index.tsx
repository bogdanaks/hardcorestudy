import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import './index.scss'
import { App } from './App'

import { store } from './redux/store'

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

render(app, document.getElementById('root'))
