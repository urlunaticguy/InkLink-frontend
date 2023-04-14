import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, yellow, red, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AB47BC",
    },
    secondary: {
      main: "#7CB342",
    },
  },
});

const GoogleButton = ({ type, label, onClick, disabled, bgColor }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ borderRadius: 4 }}>
        <Button
          type={type}
          variant="contained"
          color={bgColor}
          onClick={onClick}
          disabled={disabled}
        >
          <p style={{ color: "white" }}>{label}</p>
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default GoogleButton;
