import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Dashboard/Navbar";
import AppBar from "./Dashboard/AppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    // color: "red",
    height: "100vh",
    width: "100vw",
    display: "flex",
    // alignItems: "center",
    // justifyContent: "start",
    backgroundColor: "transparent",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function DashboardHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar name="HOME" />
      <AppBar title="Home" />
    </div>
  );
}

export default DashboardHome;
