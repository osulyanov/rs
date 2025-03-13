import './app.css';
import { MainPage } from '../pages/main-page';
import { Route, Routes } from 'react-router';
import { Layout } from './layout';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};
