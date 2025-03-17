import { SubmissionState } from '../slices/submissions-slice';

export const SubmissionDetails = (props: {
  submission: SubmissionState;
  handleDelete: (key: string) => void;
  highlight: boolean;
}) => {
  return (
    <div className={`result-tile ${props.highlight ? 'highlight' : ''}`}>
      <div className="avatar">
        <img
          src={props.submission.profilePicture}
          alt={props.submission.name}
        />
      </div>
      <div className="info">
        <h3>{props.submission.name}</h3>
        <p>
          <span>Age:</span> {props.submission.age}
        </p>
        <p>
          <span>Email:</span> {props.submission.email}
        </p>
        <p>
          <span>Gender:</span> {props.submission.gender}
        </p>
        <p>
          <span>Country:</span> {props.submission.country}
        </p>
        <p className="timestamp">
          <span>Submitted:</span> {props.submission.createdAt}
        </p>
      </div>
      <button
        className="delete-btn"
        onClick={() => props.handleDelete(props.submission.createdAt)}
      >
        X
      </button>
    </div>
  );
};
