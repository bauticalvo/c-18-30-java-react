import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider 
        domain='dev-dh2uj1sat5nznxge.us.auth0.com' 
        clientId='1JECf6OlE2d6dIa10CTALOOJ4Nh0fZUr' 
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}  
      >
        <App />
      </Auth0Provider>
      
    </BrowserRouter>
  </React.StrictMode>,
)
