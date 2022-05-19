import docsLogo from "../../static/images/docs-thumbnail.svg";
import "./NoUrl.scss";

export default function NoUrl() {
  return (
    <div className="no-url">
      <div className="no-url-intro">
        성능을 측정하고 싶은 사이트의 URL을 입력해주세요.
      </div>
      <img className="no-url-logo" src={docsLogo} alt="logo" />
    </div>
  );
}
