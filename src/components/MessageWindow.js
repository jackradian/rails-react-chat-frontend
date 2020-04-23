import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getStoredUserAuth } from "../utils/Helpers";

const useStyles = makeStyles(theme => ({
  messageWindow: {
    height: "100%",
    overflow: "auto",
    marginBottom: theme.spacing(1)
  },
  messageWrapper: {
    padding: theme.spacing(1),
    display: "inline-block",
    marginBottom: theme.spacing(1),
    background: "white"
  },
  messageLeft: {
    backgroundColor: theme.palette.secondary.main,
    color: "white"
  },
  sentAt: {
    margin: theme.spacing(1),
    whiteSpace: "nowrap"
  },
  message: {
    whiteSpace: "pre-wrap"
  }
}));

function Message({ msg, sentAt, sender }) {
  const classes = useStyles();
  const leftAlign = sender !== getStoredUserAuth().nickname;
  return (
    <Box display="flex" flexDirection={leftAlign ? "row" : "row-reverse"}>
      <Paper
        className={clsx(classes.messageWrapper, {
          [classes.messageLeft]: leftAlign
        })}
      >
        <Typography component="span" className={classes.message}>
          {msg}
        </Typography>
      </Paper>
      <Typography variant="caption" className={classes.sentAt}>
        {sentAt}
      </Typography>
    </Box>
  );
}

Message.propTypes = {
  msg: PropTypes.string,
  sentAt: PropTypes.string,
  sender: PropTypes.string
};

function MessageWindow({ messages }) {
  const classes = useStyles();
  const windowBottomRef = useRef(null);

  const scrollToBottom = () => {
    windowBottomRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box className={classes.messageWindow}>
      {messages &&
        messages.length > 0 &&
        messages.map((msg, idx) => (
          <Message
            key={idx}
            msg={msg.content}
            sentAt={msg.sent_at}
            sender={msg.sender_nickname}
          />
        ))}
      <div ref={windowBottomRef}></div>
    </Box>
  );
}

MessageWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender_nickname: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sent_at: PropTypes.string.isRequired
    })
  )
};

export default MessageWindow;
