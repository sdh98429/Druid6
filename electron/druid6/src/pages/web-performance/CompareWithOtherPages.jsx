import "./CompareWithOtherPages.scss";
import ButtonToOtherPages from "./ButtonToOtherPages";

export default function CompareWithOtherPages() {
  return (
    <div className="CompareWithOtherPages">
      <div className="center">
        <ButtonToOtherPages pageName={"내 웹"} />
      </div>
      <div className="left-top">
        <ButtonToOtherPages pageName={"구글"} />
      </div>
      <div className="left-bottom">
        <ButtonToOtherPages pageName={"네이버"} />
      </div>
      <div className="right-top">
        <ButtonToOtherPages pageName={"다음"} />
      </div>
      <div className="right-bottom">
        <ButtonToOtherPages pageName={"빙"} />
      </div>
    </div>
  );
}
