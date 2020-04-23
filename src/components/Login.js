import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../api/authApi";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        {error && <ErrorMessage errorMessage={error} />}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login_email"
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
            id="login_password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl margin="normal">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormControl>
        </form>
      </div>
    </Container>
  );
}

export default Login;
