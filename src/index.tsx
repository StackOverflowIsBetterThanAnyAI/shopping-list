import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore: side-effect CSS import without type declarations
import './index.css'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ShoppingCart />
    </React.StrictMode>
)
