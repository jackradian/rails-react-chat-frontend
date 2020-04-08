import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  sentAtLeft: {
    marginRight: theme.spacing(1),
    whiteSpace: "nowrap"
  },
  sentAtRight: {
    marginLeft: theme.spacing(1),
    whiteSpace: "nowrap"
  },
  message: {
    whiteSpace: "pre-wrap"
  }
}));

function MessageLeft({ msg, sentAt }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-start">
      <Box display="flex">
        <Paper className={classes.messageWrapper}>
          <Typography
            component="span"
            color="secondary"
            className={classes.message}
          >
            {msg}
          </Typography>
        </Paper>
        <Typography variant="caption" className={classes.sentAtRight}>
          {sentAt}
        </Typography>
      </Box>
    </Box>
  );
}
function MessageRight({ msg, sentAt }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex">
        <Typography variant="caption" className={classes.sentAtLeft}>
          {sentAt}
        </Typography>
        <Paper className={classes.messageWrapper}>
          <Typography
            component="span"
            color="primary"
            className={classes.message}
          >
            {msg}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

function MessageWindow({ messages }) {
  const classes = useStyles();
  const currentUserNickname = getStoredUserAuth().nickname;
  const windowBottomRef = useRef(null);

  const scrollToBottom = () => {
    windowBottomRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box className={classes.messageWindow}>
      {messages &&
        messages.length > 0 &&
        messages.map((msg, idx) =>
          msg.sender_nickname === currentUserNickname ? (
            <MessageRight key={idx} msg={msg.content} sentAt={msg.sent_at} />
          ) : (
            <MessageLeft key={idx} msg={msg.content} sentAt={msg.sent_at} />
          )
        )}
      <div ref={windowBottomRef}></div>
    </Box>
  );
}

export default MessageWindow;
