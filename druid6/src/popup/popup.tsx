import React from "react"
import ReactDOM from 'react-dom/client'
import './popup.css'
import StressTest from './StressTest.jsx';

function App() {
  return (
    <div>
      <img src="icon.png" alt="icon-img" />
      <StressTest />
    </div>
  );
}
const app = App()

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(app)
