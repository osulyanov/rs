import Header from './header.tsx';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
