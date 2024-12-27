import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from "./Components/LoginPage.jsx"
import LoginPage from './Components/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < LoginPage/>
  </StrictMode>,
)
