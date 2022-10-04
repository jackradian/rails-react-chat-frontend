import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  textField: {
    flexGrow: 1,
    backgroundColor: "white",
    resize: "none",
    padding: theme.spacing(1),
    fontSize: "1rem",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid transparent",
    boxShadow: theme.shadows[1],
    "&:focus": {
      outline: "none",
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  sendButton: {
    padding: theme.spacing(0, 1),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

function MessageInput({ isEnabled, subscription }) {
  const classes = useStyles();

  function catchReturn(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.target.value) {
        const value = e.target.value.trim();
        if (value !== "") {
          subscription.perform("send_message", {
            content: value,
            sent_at: Date.now(),
          });
        }
      }
      e.target.value = null;
      e.preventDefault();
    }
  }

  return (
    <>
      {isEnabled ? (
        <Box display="flex">
          <TextareaAutosize
            className={classes.textField}
            rowsMin={1}
            rowsMax={4}
            aria-label="input message"
            placeholder="Input Message"
            onKeyPress={catchReturn}
          />
          <IconButton className={classes.sendButton}>
            <SendRoundedIcon fontSize="large" />
          </IconButton>
        </Box>
      ) : null}
    </>
  );
}

MessageInput.propTypes = {
  isEnabled: PropTypes.bool,
  subscription: PropTypes.object,
};

export default MessageInput;
