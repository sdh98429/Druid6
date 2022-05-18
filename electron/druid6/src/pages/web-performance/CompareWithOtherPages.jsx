import "./CompareWithOtherPages.scss";
import ButtonToOtherPages from "./ButtonToOtherPages";

export default function CompareWithOtherPages() {
  // const pageNames = ["myPage", "google", "naver", "daum", "bing"];

  return (
    <div className="CompareWithOtherPages">
      <ButtonToOtherPages pageName={"myPage"} />
      {/* <ButtonToOtherPages pageName={"google"} className="left-top" />
      <ButtonToOtherPages pageName={"naver"} className="left-bottom" />
      <ButtonToOtherPages pageName={"daum"} className="right-top" />
      <ButtonToOtherPages pageName={"bing"} className="right-bottom" /> */}

      {/* {pageNames.map((pageName) => (
        <ButtonToOtherPages pageName={pageName} />
      ))}
      ; */}
    </div>
  );
}
