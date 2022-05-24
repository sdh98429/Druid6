import docsLogo from "../../static/images/icon.png";

import "./NoUrl.scss";

export default function Intro() {
  function setSheenPosition(xRatio, yRatio) {
    // This creates a "distance" up to 400px each direction to offset the sheen
    const xOffset = 1 - (xRatio - 0.5) * 800;
    const yOffset = 1 - (yRatio - 0.5) * 800;
    const target = document.getElementsByClassName("intro-logo")[0];
    target.style.setProperty("--sheenX", `${xOffset}px`);
    target.style.setProperty("--sheenY", `${yOffset}px`);
  }

  function handleMouseMove(event) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    // Creates angles of (-20, -20) (left, bottom) and (20, 20) (right, top)
    const yAxisDegree = (event.pageX / width) * 60 - 20;
    const xAxisDegree = (event.pageY / height) * -1 * 60 + 20;
    const target = document.getElementsByClassName("intro-logo")[0];
    target.style.transform = `rotateY(${yAxisDegree}deg) rotateX(${xAxisDegree}deg)`;
    // Set the sheen position
    setSheenPosition(event.pageX / width, event.pageY / width);
  }

  return (
    <div className="no-url" onMouseMove={handleMouseMove}>
      <div className="no-url-intro">
        성능을 측정하고 싶은 사이트의 URL을 입력해주세요.
      </div>
      <div className="perspective-container">
        <img src={docsLogo} className="intro-logo" alt="logo" />
      </div>
    </div>
  );
}
