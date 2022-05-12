import './RouteWrapper.scss';

export default function RouteWrapper({ Component }) {
  return (
    <div className="route-wrapper">
      <div className="route-container">
        <Component />
      </div>
    </div>
  );
}
