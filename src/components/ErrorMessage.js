import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <Typography variant="subtitle1" color="error">
      {errorMessage}
    </Typography>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
