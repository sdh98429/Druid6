import * as React from 'react';
import { Link } from 'react-router-dom';
// components
import SideBarMenu from './SideBarMenu';
// mui components
import { Paper, MenuList, Box, Divider } from '@mui/material';
// mui-icons
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SpeedIcon from '@mui/icons-material/Speed';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// scss
import './SideBar.scss';
// imgs
import logo from '../static/images/icon.png';

export default function SideBar() {

  return (
    <Paper className="side-bar" >
      <Link to="/">
        <div className='logo-wrapper'> 
          <img src={logo} alt="" className='logo-img'/>
          <div className='logo-desc'>Druid6</div>
        </div>
      </Link>
      <br />
      <Divider/>
      <br />
      <MenuList className='menu-list'>
        <div className="category">Monitoring</div>
        <SideBarMenu to={"/"} text={"대시보드"} Icon={ DashboardIcon }/>
        <SideBarMenu to={"server-monitoring"} text={"서버 모니터링"} Icon={ MonitorHeartIcon }/>
        <SideBarMenu to={"network-monitoring"} text={"네트워크 모니터링"} Icon={ MonitorHeartIcon }/>
        <div className="category">Testing Tools</div>
        <SideBarMenu to={"web-performance"} text={"부하 테스트"} Icon={ NetworkCheckIcon }/>
        <SideBarMenu to={"web-performance"} text={"웹 퍼포먼스"} Icon={ SpeedIcon }/>
        <div className="category">Support</div>
        <SideBarMenu to={"web-performance"} text={"고객센터"} Icon={ SupportAgentIcon }/>
      </MenuList>
    </Paper>
  );
}
