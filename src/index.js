import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from 'app/store'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
)
