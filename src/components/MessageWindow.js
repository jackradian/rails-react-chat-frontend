import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getStoredUserAuth } from "../utils/Helpers";

const useStyles = makeStyles(theme => ({
  messageWindow: {
    height: "100%",
    overflow: "auto"
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
  }
}));

function MessageLeft({ msg, sentAt }) {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="flex-start">
      <Box display="flex">
        <Paper className={classes.messageWrapper}>
          <Typography component="span" color="secondary" className="selected">
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
          <Typography component="span" color="primary">
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

  return (
    <Box className={classes.messageWindow}>
      {messages &&
        messages.length > 0 &&
        messages.map(msg =>
          msg.sender_nickname === currentUserNickname ? (
            <MessageRight key={msg.id} msg={msg.content} sentAt={msg.sent_at} />
          ) : (
            <MessageLeft key={msg.id} msg={msg.content} sentAt={msg.sent_at} />
          )
        )}
    </Box>
  );
}

export default MessageWindow;
