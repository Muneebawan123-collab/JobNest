import { Component } from 'react';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends Component {
  state = { error: null };
  
  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Alert variant="danger" className="mt-5">
          <h4>Something went wrong:</h4>
          <pre>{this.state.error.message}</pre>
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;