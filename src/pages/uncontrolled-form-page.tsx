import { BackButton } from '../components/back-button';
import { UncontrolledForm } from '../components/uncontrolled-form';
import { FormSubmissionData } from '../app/app';

export const UncontrolledFormPage = ({
  saveSubmission,
}: {
  saveSubmission: (data: FormSubmissionData) => Promise<void>;
}) => {
  return (
    <div className="form-container">
      <BackButton />
      <h2>Uncontrolled Form</h2>
      <UncontrolledForm saveSubmission={saveSubmission} />
    </div>
  );
};
