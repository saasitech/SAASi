"use client";
import { useEffect, useState } from "react";

// This functional component attempts to mimic the structure but won't catch errors in children
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  // This effect serves as an example of catching errors, but won't work for child components
  useEffect(() => {
    // Normally, you'd catch errors here, but functional components can't catch child errors
    const handleError = (error) => {
      console.log(error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h2>Oops, there is an error!</h2>
        <button type="button" onClick={() => setHasError(false)}>
          Try again?
        </button>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
