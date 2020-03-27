import React from "react";
import { Router, Redirect } from "@reach/router";

import ChatHome from "../components/ChatHome";

function LoggedInContainer() {
  return (
    <Router>
      <ChatHome path="/" />
      <Redirect default noThrow from="*" to="/" />
    </Router>
  );
}

export default LoggedInContainer;
