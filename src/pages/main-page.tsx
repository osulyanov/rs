import { Link, useParams } from 'react-router';
import { EmptyState } from '../components/empty-state';
import {
  deleteSubmission,
  selectSubmissions,
} from '../slices/submissions-slice';
import { useSelector, useDispatch } from 'react-redux';
import { SubmissionDetails } from '../components/submission-details';

export const MainPage = () => {
  const { latestSubmission } = useParams();
  const submissions = useSelector(selectSubmissions);
  const dispatch = useDispatch();

  const handleDelete = (createdAt: string) => {
    dispatch(deleteSubmission(createdAt));
  };

  return (
    <div className="results-container">
      <Link to={'/uncontrolled-form'} className="nav-link">
        Uncontrolled Form &gt;
      </Link>
      <Link to={'/react-hook-form'} className="nav-link">
        React Hook Form &gt;
      </Link>
      <h2>Form Submissions</h2>
      {submissions.length === 0 && <EmptyState />}
      <div className="results-grid">
        {submissions.map((submission) => (
          <SubmissionDetails
            key={submission.createdAt}
            submission={submission}
            handleDelete={handleDelete}
            highlight={latestSubmission === submission.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
