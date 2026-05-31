import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

const DarlingsApp = lazy(() => import('./App'))
const BouteilleApp = lazy(() => import('./BouteilleApp'))
const YellowTailApp = lazy(() => import('./YellowTailApp'))

function Router() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  const routes = {
    '/':           DarlingsApp,
    '/darlings':   DarlingsApp,
    '/bouteille':  BouteilleApp,
    '/yellowtail': YellowTailApp,
  }

  const App = routes[path]

  if (!App) {
    return (
      <div style={{
        minHeight: '100vh', background: '#000', color: '#555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', sans-serif", fontSize: 14, letterSpacing: '0.1em',
      }}>
        404
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh', background: '#000',
      }} />
    }>
      <App />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)