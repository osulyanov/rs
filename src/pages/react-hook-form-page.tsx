import { BackButton } from '../components/back-button';
import { ReactHookForm } from '../components/react-hook-form';
export const ReactHookFormPage = () => {
  return (
    <div className="form-container">
      <BackButton />
      <h2>React Hook Form</h2>
      <ReactHookForm />
    </div>
  );
};
