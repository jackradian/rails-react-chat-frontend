import React, { useState } from "react";
import LoggedOutHeader from "./LoggedOutHeader";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../api/authApi";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  function handleSubmit(event) {
    event.preventDefault();
    login({ email, password }).then(data => {
      if (data.err === 0 && data.id) {
        auth.setAuthStatus({
          id: data.id,
          email: data.email,
          nickname: data.nickname
        });
      } else {
        auth.setUnauthStatus();
        showError(data.msg);
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <LoggedOutHeader />
      <div className={classes.toolbar} />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        {error && <ErrorMessage errorMessage={error} />}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
