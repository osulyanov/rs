export const MainPage = () => {
  interface Submission {
    id: string;
    name: string;
    age: number;
    email: string;
    gender: string;
    country: string;
    createdAt: string;
    image: string;
  }
  const submissions: Submission[] = [];

  return (
    <div className="results-container">
      <h2>Form Submissions</h2>
      {submissions.length === 0 && (
        <div className="empty-state">No submissions yet</div>
      )}
      {submissions.map((submission) => (
        <div className="results-grid" key={submission.id}>
          <div className="result-tile">
            <div className="avatar">
              <img src={submission.image} alt={submission.name} />
            </div>
            <div className="info">
              <h3>Олег</h3>
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
        </div>
      ))}
    </div>
  );
};
