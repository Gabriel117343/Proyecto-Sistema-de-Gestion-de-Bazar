import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LoginProvider } from './context/LoginContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </LoginProvider>
)
