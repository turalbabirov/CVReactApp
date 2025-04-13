import React from "react";

const withErrorBoundary = (WrappedComponent) => {
   return class ErrorBoundary extends React.Component {
      constructor(props) {
         super(props);
         this.state = { hasError: false };
      }

      static getDerivedStateFromError(error) {
         return { hasError: true };
      }

      componentDidCatch(error, errorInfo) {
         console.error("Error caught by ErrorBoundary:", error, errorInfo);
      }

      render() {
         if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
         }

         return <WrappedComponent {...this.props} />;
      }
   };
};

export default withErrorBoundary;
