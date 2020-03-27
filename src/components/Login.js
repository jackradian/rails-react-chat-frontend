import React, { useState } from "react";
import { login } from "../api/authApi";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  function handleSubmit(event) {
    event.preventDefault();
    login({ email: email, password: password }).then(data => {
      if (data.err === 0 && data.id) {
        auth.setAuthStatus({ id: data.id, email: data.email });
      } else {
        auth.setUnauthStatus();
        showError(data.msg);
      }
    });
  }

  return (
    <div>
      {error && <ErrorMessage errorMessage={error} />}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
