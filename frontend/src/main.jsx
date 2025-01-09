import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/App'
import './css/custom.css'
import './css/custom2.css'
import 'rsuite/DateRangePicker/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
