import './RouteWrapper.scss';

export default function RouteWrapper({ Component }) {
  return (
    <div className="route-wrapper">
      <Component />
    </div>
  );
}
