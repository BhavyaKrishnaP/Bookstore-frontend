import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='978222180524-6pam7dftlrl72elkj1dh971miutu7p71.apps.googleusercontent.com'>
        <Contextshare>
          <App />
        </Contextshare>
      </GoogleOAuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
