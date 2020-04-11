import React from "react";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <Typography variant="subtitle1" noWrap color="error">
      {errorMessage}
    </Typography>
  );
};

export default ErrorMessage;
