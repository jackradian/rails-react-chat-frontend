import React from "react";
import "./app.css";
import RootContainer from "../containers/RootContainer";
import AuthContextProvider from "../contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <RootContainer />
    </AuthContextProvider>
  );
}

export default App;
