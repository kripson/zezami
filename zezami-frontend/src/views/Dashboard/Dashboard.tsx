import { Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Zezami Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;