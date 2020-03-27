import React from "react";

import { authContext } from "../contexts/AuthContext";
import LoggedInContainer from "./LoggedInContainer";
import UnloggedInContainer from "./UnloggedInContainer";

function RootContainer() {
  const { auth } = React.useContext(authContext);
  return <div>{auth.id ? <LoggedInContainer /> : <UnloggedInContainer />}</div>;
}

export default RootContainer;
