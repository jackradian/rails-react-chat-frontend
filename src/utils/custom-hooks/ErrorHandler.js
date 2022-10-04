import React from "react";

const useErrorHandler = (initialState) => {
  const [error, setError] = React.useState(initialState);
  const showError = (errorMessage) => {
    setError(errorMessage);
  };
  return { error, showError };
};

export default useErrorHandler;
