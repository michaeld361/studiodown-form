import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'           // ← Darlings original
import App from './BouteilleApp'       // ← Bouteille wine shop

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)