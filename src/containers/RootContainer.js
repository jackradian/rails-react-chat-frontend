import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { authContext } from "../contexts/AuthContext";
import LoggedInContainer from "./LoggedInContainer";
import UnloggedInContainer from "./UnloggedInContainer";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#a8e9ff",
      main: "#75b7d8",
      dark: "#4287a6",
      contrastText: "#446e9e"
    },
    secondary: {
      light: "#affeff",
      main: "#7ccbe0",
      dark: "#489aae",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
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
