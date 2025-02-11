import Header from './header';
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
