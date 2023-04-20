import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Dashboard/Navbar";
import AppBar from "./Dashboard/AppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    backgroundColor: "transparent",
  },
}));

function DashboardHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar name="HOME" type="User" />
      <AppBar title="Home" />
      {/* put home content for user here */}
    </div>
  );
}

export default DashboardHome;
