import { Header } from './header';
import { Outlet } from 'react-router';
import { Footer } from './footer';

export const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
