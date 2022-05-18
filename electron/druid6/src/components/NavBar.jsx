import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import menuTitleArrow from "../static/images/menu-title-arrow.svg";
import "./NavBar.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar() {
  const currentMenuTitle = useSelector((state) => state.currentMenuTitle);

  return (
    <div className="NavBar">
      <div className="current-menu-title nav-item">
        {currentMenuTitle !== "웹 퍼포먼스 테스트" && (
          <>
            <img src={menuTitleArrow} className="menu-title-arrow" alt="logo" />
            <div className="menu-text">{currentMenuTitle}</div>
          </>
        )}
      </div>
      <div className="menu-icons">
        <div className="nav-item">
          <NotificationsNoneIcon />
        </div>
        <div className="nav-item">
          <BuildOutlinedIcon />
        </div>
        <div className="nav-item">
          <SettingsOutlinedIcon />
        </div>
      </div>
    </div>
  );
}
