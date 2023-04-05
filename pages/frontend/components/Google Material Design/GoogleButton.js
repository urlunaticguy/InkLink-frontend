import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const GoogleButton = ({ type, label, onClick, disabled }) => {
  return (
    <Box sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Button
        type={type}
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </Box>
  );
};

export default GoogleButton;
