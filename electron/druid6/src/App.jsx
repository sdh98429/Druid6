import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import RouteWrapper from './RouteWrapper';
import Intro from './pages/intro/Intro';
import StressTest from './pages/stress-test/StressTest';
import StressTestResult from './pages/stress-test/StressTestResult';
import ServerMonitoring from './pages/server-monitoring/ServerMonitoring';
import NetworkMonitoring from './pages/network-monitoring/NetworkMonitoring';
import WebPerformance from './pages/web-performance/WebPerformance';

function App() {
  return (
    <HashRouter>
      <div>
        <div className='grid-container'>
          <SideBar />
          <div>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<RouteWrapper Component={Intro} />} />
              <Route path="/stress-test" element={<RouteWrapper Component={StressTest} />} />
              <Route path="/stress-test-result" element={<RouteWrapper Component={StressTestResult} />} />
              <Route path="/server-monitoring" element={<RouteWrapper Component={ServerMonitoring} />} />
              <Route path="/network-monitoring" element={<RouteWrapper Component={NetworkMonitoring} />} />
              <Route path="/web-performance" element={<RouteWrapper Component={WebPerformance} />} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
