import { Component } from 'react';

interface LoadingErrorProps {
  message: string;
}

class LoadingError extends Component<LoadingErrorProps> {
  render() {
    return (
      <div className="data-report">
        <p>[{this.props.message}]</p>
      </div>
    );
  }
}

export default LoadingError;
