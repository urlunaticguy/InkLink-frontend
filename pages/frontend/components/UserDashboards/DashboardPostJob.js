import React from "react";
import Navbar from "../Dashboard/Navbar";
import AppBar from "../Dashboard/AppBar";

function DashboardPostJob() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar name="POST_JOB" />
      <div style={{ width: "100%" }}>
        <AppBar title="Post Job" />
      </div>
    </div>
  );
}

export default DashboardPostJob;
