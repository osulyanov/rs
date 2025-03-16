import './app.css';
import { MainPage } from '../pages/main-page';
import { Route, Routes } from 'react-router';
import { Layout } from './layout';
import { ReactHookFormPage } from '../pages/react-hook-form-page';
import { UncontrolledFormPage } from '../pages/uncontrolled-form-page';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:latestSubmission?" element={<MainPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
        <Route path="uncontrolled-form" element={<UncontrolledFormPage />} />
      </Route>
    </Routes>
  );
};
