import logo from './static/images/icon.png';

export default function Intro() {
  return (
    <div className="Intro">
      <header className="Intro-header">
        <img src={logo} className="Intro-logo" alt="logo" />
        <p>
          최고의 애플리케이션 모니터링 솔루션, Druid6 입니다.
        </p>
        <a
          className="Intro-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Druid6
        </a>
      </header>
    </div>
  );
}
