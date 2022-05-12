import DailyTrafficChart from './DailyTrafficChart';

import '../../styles/badge.scss';
import './NetworkMonitoring.scss';

export default function NetworkMonitoring() {
  return (
    <div className='NetworkMonitoring'>
      <div className='badge live-traffic'>
        <div className='badge-title'>
          실시간 트래픽
        </div>
      </div>
      <div className='badge daily-traffic'>
        <div className='badge-title'>
          일별 트래픽
          <DailyTrafficChart />
        </div>
      </div>
    </div>
  );
}
