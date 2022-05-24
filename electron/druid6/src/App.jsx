import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import RouteWrapper from "./RouteWrapper";
import Intro from "./pages/intro/Intro";
import StressTest from "./pages/stress-test/StressTest";
import StressTestResult from "./pages/stress-test/StressTestResult";
import ServerMonitoring from "./pages/server-monitoring/ServerMonitoring";
import NetworkMonitoring from "./pages/network-monitoring/NetworkMonitoring";
import WebPerformanceContainer from "./pages/web-performance/WebPerformanceContainer";
import DashBoard from "./pages/dashboard/DashBoard";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  // mui에 폰트 적용
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Noto Sans KR",
        "Noto Sans",
        "Montserrat",
        "sans-serif",
      ].join(","),
      fontWeightRegular: 600,
    },
    palette: {
      blue: {
        light: "#1E7CC9",
        main: "#1d75bdc5",
        dark: "#134D7D",
        contrastText: "#ffffff",
      },
      green: {
        light: "#44CF67",
        main: "#2b8140c4",
        dark: "#236934",
        contrastText: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <div>
          <div className="grid-container">
            <SideBar />
            <div>
              <NavBar />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<RouteWrapper Component={Intro} />}
                />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route
                  path="/stress-test"
                  element={<RouteWrapper Component={StressTest} />}
                />
                <Route
                  path="/stress-test-result"
                  element={<RouteWrapper Component={StressTestResult} />}
                />
                <Route
                  path="/server-monitoring"
                  element={<RouteWrapper Component={ServerMonitoring} />}
                />
                <Route
                  path="/network-monitoring"
                  element={<RouteWrapper Component={NetworkMonitoring} />}
                />
                <Route
                  path="/web-performance"
                  element={<RouteWrapper Component={WebPerformanceContainer} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
