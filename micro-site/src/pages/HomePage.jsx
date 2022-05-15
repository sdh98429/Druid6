import ResponsiveAppBar from "../components/ResponsiveAppBar";
import DownloadBtn from "./DownloadBtn";

import './HomePage.scss';

export default function HomePage() {
  return (
    <div className="HomePage">
      <ResponsiveAppBar />
      <header>
        <div className="header-background">
          header-background
          <DownloadBtn />
        </div>
      </header>
    </div>
  );
}
