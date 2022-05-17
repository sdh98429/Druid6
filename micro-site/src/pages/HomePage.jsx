import DownloadBtn from "./DownloadBtn";

import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="HomePage">
      <header className="header">
        <div className="header-background">
          <div className="header-title">
            최고의 애플리케이션 모니터링 서비스,{" "}
            <span className="product-name">Druid6</span> 입니다.
          </div>
          <DownloadBtn />
        </div>
      </header>
    </div>
  );
}
