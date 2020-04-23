import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { authContext } from "../contexts/AuthContext";
import LoggedInContainer from "./LoggedInContainer";
import UnloggedInContainer from "./UnloggedInContainer";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#64c1ff",
      main: "#0091ea",
      dark: "#0064b7",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol"
    ].join(",")
  }
});

function RootContainer() {
  const { auth } = React.useContext(authContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {auth.id ? <LoggedInContainer /> : <UnloggedInContainer />}
    </ThemeProvider>
  );
}

export default RootContainer;
