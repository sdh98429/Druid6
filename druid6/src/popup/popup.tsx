import React from "react"
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import store from './store';

import './popup.css'
import StressTest from './StressTest.jsx';
import ServerMonitoring from './server/ServerMonitoring.jsx';

function App() {
  return (
    <Provider store={store}>
      <div>
        <img src="icon.png" alt="icon-img" />
        <StressTest />
        <ServerMonitoring />
      </div>
    </Provider>
  );
}
const app = App();

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(app)
