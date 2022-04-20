import './App.css';
import { Routes, Route } from "react-router-dom";

import MainPage from './MainPage/MainPage';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="web-performance" element={<WebPerformance />} />
        <Route path="server-monitoring" element={<ServerMonitoring />} />
        <Route path="stress-test" element={<StressTest />} /> */}
      </Routes>
    </div>
  );
}

export default App;
