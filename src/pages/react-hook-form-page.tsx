import { BackButton } from '../components/back-button';
import { ReactHookForm } from '../components/react-hook-form';
import { FormSubmissionData } from '../app/app';

export const ReactHookFormPage = ({
  saveSubmission,
}: {
  saveSubmission: (data: FormSubmissionData) => Promise<void>;
}) => {
  return (
    <div className="form-container">
      <BackButton />
      <h2>React Hook Form</h2>
      <ReactHookForm saveSubmission={saveSubmission} />
    </div>
  );
};
