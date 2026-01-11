import { Component } from 'react';
import ErrorUi from './ErrorUi';

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  //   monitor
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // logging
  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <ErrorUi />;
    return this.props.children;
  }
}

export default ErrorBoundry;
