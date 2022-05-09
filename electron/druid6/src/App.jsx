import './App.css';

import { HashRouter, Route } from 'react-router-dom';

import SideBar from './SideBar';
import Intro from './Intro';
import ServerMonitoring from './ServerMonitoring';

function App() {
  return (
    <HashRouter>
      <div>
        <SideBar />
        <Route path="/" exact component={Intro} />
        <Route path="/server-monitoring" component={ServerMonitoring} />
      </div>
    </HashRouter>
  );
}

export default App;
