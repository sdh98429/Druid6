import "./ButtonToOtherPages.scss";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

export default function ButtonToOtherPages({ pageName }) {
  return (
    <div className="ButtonToOtherPages">
      <div className="badge">
        <div className="header">
          <div className="page-name">
            <span>{pageName}</span>
          </div>
          <div className="icon">
            <BuildOutlinedIcon />
          </div>
        </div>
        <div className="chart">
          <img
            src={require(`../../static/images/web-performance-${pageName}.png`)}
            alt="logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}
