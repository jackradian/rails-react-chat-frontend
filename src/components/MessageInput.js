import React from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%",
    backgroundColor: "white",
    resize: "none",
    padding: theme.spacing(1.5),
    fontSize: "1rem",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid transparent",
    boxShadow: theme.shadows[1],
    "&:focus": {
      outline: "none",
      border: `2px solid ${theme.palette.primary.main}`
    }
  }
}));

function MessageInput({ subscription }) {
  const classes = useStyles();

  function catchReturn(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.target.value) {
        const value = e.target.value.trim();
        if (value !== "") {
          subscription.perform("send_message", {
            content: value,
            sent_at: Date.now()
          });
        }
      }
      e.target.value = null;
      e.preventDefault();
    }
  }

  return (
    <TextareaAutosize
      className={classes.textField}
      rowsMin={1}
      rowsMax={4}
      aria-label="input message"
      placeholder="Input Message"
      onKeyPress={catchReturn}
    />
  );
}

MessageInput.propTypes = {
  subscription: PropTypes.object
};

export default MessageInput;
