import './App.css';
import SideBar from './SideBar';
import Intro from './Intro';
import ServerMonitoring from './ServerMonitoring';

function App() {
  return (
    <div>
      <Intro />
      <ServerMonitoring />
      <SideBar />
    </div>
  );
}

export default App;
