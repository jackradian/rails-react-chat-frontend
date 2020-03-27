import React from "react";
import { Router, Redirect } from "@reach/router";
import Login from "../components/Login";

function UnloggedInContainer() {
  return (
    <div>
      <Router>
        <Login path="/" />
      </Router>
      <Redirect default noThrow to="/" />
    </div>
  );
}

export default UnloggedInContainer;
