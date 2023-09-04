import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ShoppingCart />
    </React.StrictMode>
)
reportWebVitals()
