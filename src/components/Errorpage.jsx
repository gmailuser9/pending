import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ errorType }) => {
  const errorMessages = {
    notFound: "Oops! The page you're looking for does not exist.",
    serverError: "Sorry! Something went wrong on our end.",
    default: "An unexpected error has occurred.",
  };

  return (
    <div className="error-page">
      <h1>{errorMessages[errorType] || errorMessages.default}</h1>
      <p>
        <Link to="/">Go back to the home page</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
