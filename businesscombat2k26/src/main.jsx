import { StrictMode } from 'react'
import {inject} from '@vercel/analytics'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
inject();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
