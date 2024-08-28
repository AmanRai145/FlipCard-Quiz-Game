import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FlipcardGame from './FlipcardGame.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlipcardGame />
  </StrictMode>,
)




