import './App.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import SideBar from './components/SideBar';
import Intro from './pages/intro/Intro';
import ServerMonitoring from './pages/server-monitoring/ServerMonitoring';
import WebPerformance from './pages/web-performance/WebPerformance';

function App() {
  return (
    <HashRouter>
      <div>
        <div className='grid-container'>
          <SideBar />
          <Routes>
            <Route exact path="/" element={<Intro />} />
            <Route path="/server-monitoring" element={<ServerMonitoring />} />
            <Route path="/web-performance" element={<WebPerformance />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
