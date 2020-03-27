import React from "react";
import { Router, Redirect } from "@reach/router";
import Login from "../components/Login";
import Signup from "../components/Signup";

function UnloggedInContainer() {
  return (
    <div>
      <Router>
        <Login path="/" />
        <Signup path="signup" />
        <Redirect default noThrow from="*" to="/" />
      </Router>
    </div>
  );
}

export default UnloggedInContainer;
