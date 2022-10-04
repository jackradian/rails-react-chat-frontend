import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { signup } from "../api/authApi";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Signup() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const auth = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  function handleSubmit(event) {
    event.preventDefault();
    signup({ email, password, nickname, firstName, lastName }).then((data) => {
      if (data.err === 0 && data.id) {
        auth.setAuthStatus({
          id: data.id,
          email: data.email,
          nickname: data.nickname,
        });
      } else {
        auth.setUnauthStatus();
        if (data.err_arr) {
          showError(data.err_arr.join(" "));
        }
      }
    });
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Signup
        </Typography>
        {error && <ErrorMessage errorMessage={error} />}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="nickname"
            label="Nickname"
            id="nickname"
            autoComplete="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="first-name"
            label="First Name"
            id="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="last-name"
            label="Last Name"
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormControl margin="normal">
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </FormControl>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
