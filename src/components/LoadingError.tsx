interface LoadingErrorProps {
  message: string;
}

function LoadingError({ message }: LoadingErrorProps) {
  return (
    <div className="data-report">
      <p>[{message}]</p>
    </div>
  );
}

export default LoadingError;
