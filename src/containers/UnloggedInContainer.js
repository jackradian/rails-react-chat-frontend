import React from "react";
import LoggedOutHeader from "../components/LoggedOutHeader";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Router, Redirect } from "@reach/router";
import Login from "../components/Login";
import Signup from "../components/Signup";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    ...theme.mixins.toolbar
  }
}));

function UnloggedInContainer() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <LoggedOutHeader />
      <Grid item xs={12}>
        <div className={classes.toolbar} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Login />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Signup />
      </Grid>
      <Router>
        <Redirect default noThrow from="*" to="/" />
      </Router>
    </Grid>
  );
}

export default UnloggedInContainer;
