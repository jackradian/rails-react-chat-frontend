import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    backgroundColor: "white"
  }
}));

function MessageInput() {
  const classes = useStyles();
  return (
    <Box>
      <TextField
        className={classes.textField}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        autoFocus
        placeholder="Input Message"
      />
    </Box>
  );
}

export default MessageInput;
