import React from "react"
import ReactDOM from 'react-dom/client'
import './popup.css'
import StressTest from './StressTest.jsx';
import MonitorServer from './MonitorServer.jsx';
import { Provider } from 'react-redux'
import store from '../app/store.js';

function App() {
  return (
    <div>
      <img src="icon.png" alt="icon-img" />
      <StressTest />
      <MonitorServer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
