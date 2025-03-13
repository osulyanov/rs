import { BackButton } from '../components/back-button';
import { UncontrolledForm } from '../components/uncontrolled-form';

export const UncontrolledFormPage = () => {
  return (
    <div className="form-container">
      <BackButton />
      <h2>Uncontrolled Form</h2>
      <UncontrolledForm />
    </div>
  );
};
