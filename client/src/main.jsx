import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_domain}
      clientId={import.meta.env.VITE_clientId}
      authorizationParams={{
        redirect_uri: 'https://client-real-estate-react-vite-mongo-db-prisma.vercel.app/',
      }}
      audience='https://server-real-estate-react-vite-mongo-db-prisma.vercel.app/'
      scope='openid profile email'
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
