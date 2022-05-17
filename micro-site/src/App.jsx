import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/colorTheme";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            {/* <Route index element={<HomePage />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
