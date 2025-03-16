import { Link } from 'react-router';
import { EmptyState } from '../components/empty-state';
import { selectSubmissions } from '../slices/submissions-slice';
import { useSelector } from 'react-redux';

export const MainPage = () => {
  const submissions = useSelector(selectSubmissions);

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
          <div className="result-tile" key={submission.createdAt}>
            <div className="avatar">
              <img src={submission.profilePicture} alt={submission.name} />
            </div>
            <div className="info">
              <h3>{submission.name}</h3>
              <p>
                <span>Age:</span> {submission.age}
              </p>
              <p>
                <span>Email:</span> {submission.email}
              </p>
              <p>
                <span>Gender:</span> {submission.gender}
              </p>
              <p>
                <span>Country:</span> {submission.country}
              </p>
              <p className="timestamp">
                <span>Submitted:</span> {submission.createdAt}
              </p>
            </div>
            <button className="delete-btn">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};
