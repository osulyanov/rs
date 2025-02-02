import { Component } from 'react';

class ErrorMessage extends Component {
  render() {
    return (
      <div className="data-report">
        <p>
          [APP ERROR] Something went wrong. Please refresh the page and try
          again.
        </p>
      </div>
    );
  }
}

export default ErrorMessage;
