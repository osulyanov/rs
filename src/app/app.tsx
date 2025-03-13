import './app.css';
import { MainPage } from '../pages/main-page';
import { Route, Routes } from 'react-router';
import { Layout } from './layout';
import { ReactHookForm } from '../pages/react-hook-form';
import { UncontrolledForm } from '../pages/uncontrolled-form';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="react-hook-form" element={<ReactHookForm />} />
        <Route path="uncontrolled-form" element={<UncontrolledForm />} />
      </Route>
    </Routes>
  );
};
