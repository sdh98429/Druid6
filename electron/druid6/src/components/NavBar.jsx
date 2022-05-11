import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import './NavBar.scss';

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className='nav-item'>
        <NotificationsNoneIcon />
      </div>
      <div className='nav-item'>
        <BuildOutlinedIcon />
      </div>
      <div className='nav-item'>
        <SettingsOutlinedIcon />
      </div>
    </div>
  );
}
