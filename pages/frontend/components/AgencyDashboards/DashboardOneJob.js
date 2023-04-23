import React, { useState, useEffect } from "react";
import NavbarAgency from "../Dashboard/Agency/Navbar";
import AppBar from "../Dashboard/AppBar";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import AgencyOneJob from "../Dashboard/Agency/OneJob";

function DashboardSearchJobs() {
  let newjob;
  try {
    newjob = localStorage.getItem("onejob");
  } catch (error) {
    // Handle the error here
  }
  useEffect(() => {}, []);
  return (
    <div style={{ display: "flex" }}>
      <NavbarAgency name="SEARCH_JOBS" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="View One Job" />
        <div className={styles.example}>
          <AgencyOneJob job={newjob} />
        </div>
      </div>
    </div>
  );
}

export default DashboardSearchJobs;
