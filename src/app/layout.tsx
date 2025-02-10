import Header from './header.tsx';
import { Outlet } from 'react-router';
import AppCrashingButton from '../components/app-crashing-button.tsx';

function Layout() {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <AppCrashingButton />
    </div>
  );
}

export default Layout;
