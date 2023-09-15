import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

// import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
// import dotenv from 'dotenv';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// // ReactDOM.createRoot(document.getElementById('root')).render(
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* <Auth0Provider
//         domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
//         clientId={`${import.meta.env.VITE_AUTH0_CLIENTID}`}
//         authorizationParams={{
//           redirect_uri: window.location.origin
//         }}
//       > */}
//         <App />
//       {/* </Auth0Provider>, */}
//     </BrowserRouter>
//   </React.StrictMode>
// )