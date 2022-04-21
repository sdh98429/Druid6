import './App.css';
import { Routes, Route } from "react-router-dom";

import MainPage from './MainPage/MainPage';

import NavBar from './NavBar';
import WebPerformance from './WebPerformance/WebPerformance';
import ServerMonitoring from './ServerMonitoring/ServerMonitoring';
import StressTest from './StressTest/StressTest'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="server-monitoring" element={<ServerMonitoring />} />
        <Route path="web-performance" element={<WebPerformance />} />
        <Route path="stress-test" element={<StressTest />} /> 
      </Routes>
    </div>
  );
}

export default App;
