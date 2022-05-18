import "./ButtonToOtherPages.scss";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

export default function ButtonToOtherPages() {
  return (
    <div className="ButtonToOtherPages">
      <div className="badge">
        <div className="header">
          <div className="page-name">
            <span>네이버</span>
          </div>
          <div className="icon">
            <BuildOutlinedIcon />
          </div>
        </div>
        <div className="chart">chart</div>
      </div>
    </div>
  );
}
