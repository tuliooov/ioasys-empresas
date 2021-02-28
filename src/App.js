import React from "react";
import Routes from "./routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#57bbbc",
      shadow: "rgb(87 187 188 / 30%)",
    },
    secondary: {
      main: "#ee4c77",
    },
    error: {
      contrastText: "#fff",
      dark: "#d32f2f",
      light: "#e57373",
      main: "#f44336",
    },
    success: {
      contrastText: "rgba(0, 0, 0, 0.87)",
      dark: "#388e3c",
      light: "#81c784",
      main: "#4caf50",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;
