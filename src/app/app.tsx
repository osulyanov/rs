import './app.css';
import { MainPage } from '../pages/main-page';
import { Route, Routes } from 'react-router';
import { Layout } from './layout';
import { ReactHookFormPage } from '../pages/react-hook-form-page';
import { UncontrolledFormPage } from '../pages/uncontrolled-form-page';
import { fileToBase64 } from '../utils/file-utils';
import { addCountry, selectCountries } from '../slices/countries-slice';
import { addSubmission, SubmissionState } from '../slices/submissions-slice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

export type FormSubmissionData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  profilePicture?: File | FileList;
  terms: boolean;
  passwordConfirmation?: string;
  [key: string]: unknown;
};

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);

  const saveSubmission = async (data: FormSubmissionData) => {
    const { profilePicture, ...rest } = data;

    if (!profilePicture) {
      throw new Error('Profile picture is required');
    }

    const file =
      profilePicture instanceof FileList ? profilePicture[0] : profilePicture;

    const profilePictureBase64 = await fileToBase64(file as File);
    const submission = {
      ...rest,
      profilePicture: profilePictureBase64,
      createdAt: new Date().toISOString(),
    } as SubmissionState;

    dispatch(addSubmission(submission));
    if (!countries.includes(submission.country)) {
      dispatch(addCountry(submission.country));
    }
    navigate(`/${submission.createdAt}`);
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:latestSubmission?" element={<MainPage />} />
        <Route
          path="react-hook-form"
          element={<ReactHookFormPage saveSubmission={saveSubmission} />}
        />
        <Route
          path="uncontrolled-form"
          element={<UncontrolledFormPage saveSubmission={saveSubmission} />}
        />
      </Route>
    </Routes>
  );
};
