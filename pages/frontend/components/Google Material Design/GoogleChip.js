import React from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";

const GoogleChip = ({ label, selected, onClick, selectedColor }) => {
  return (
    <Chip
      label={label}
      color={selected ? selectedColor : "default"}
      variant={selected ? "filled" : "outlined"}
      icon={
        selected ? <DoneIcon sx={{ fontSize: "1rem", marginRight: 1 }} /> : null
      }
      sx={{ margin: "5px" }}
      onClick={onClick}
    />
  );
};

export default GoogleChip;
