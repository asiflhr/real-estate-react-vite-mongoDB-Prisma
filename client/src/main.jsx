import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

console.log('process.env: ', import.meta.env)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.domain}
      clientId={import.meta.env.clientId}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_frontent_redirect_uri,
      }}
      audience={import.meta.env.audience}
      scope='openid profile email'
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
