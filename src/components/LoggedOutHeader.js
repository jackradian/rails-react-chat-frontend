import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function LoggedOutHeader() {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className={classes.grow} />
        <Typography variant="h6" noWrap>
          Chat
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
