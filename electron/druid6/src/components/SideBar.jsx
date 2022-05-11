import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

import SideBarMenu from './SideBarMenu';

import './SideBar.scss';

export default function SideBar() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList className='menu-list'>
        <SideBarMenu to={"/"} text={"홈페이지"}/>
        <div className="category">모니터링</div>
        <SideBarMenu to={"/"} text={"대시보드"}/>
        <SideBarMenu to={"server-monitoring"} text={"서버 모니터링"}/>
        <SideBarMenu to={"web-performance"} text={"부하 테스트"}/>
        <SideBarMenu to={"web-performance"} text={"웹 퍼포먼스"}/>
        <SideBarMenu to={"web-performance"} text={"고객센터"}/>
      </MenuList>
    </Paper>
  );
}
