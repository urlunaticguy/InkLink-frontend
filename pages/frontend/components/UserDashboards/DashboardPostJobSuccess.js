import React from "react";
import Navbar from "../Dashboard/Navbar";
import AppBar from "../Dashboard/AppBar";
import PostJobSuccess from "../Dashboard/PostJobSuccess";

function DashboardPostJob() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar name="POST_JOB" type="User" />
      <div style={{ width: "100%" }}>
        <AppBar title="Post Job" />
        <PostJobSuccess />
      </div>
    </div>
  );
}

export default DashboardPostJob;
