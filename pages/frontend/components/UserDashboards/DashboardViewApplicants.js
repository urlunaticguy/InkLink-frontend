import React, { useEffect } from "react";
import Navbar from "../Dashboard/Navbar";
import AppBar from "../Dashboard/AppBar";
// import PostJobForm from "../Dashboard/PostJobForm";
import ViewApplicants from "../Dashboard/ViewApplicants";

function DashboardViewApplicants() {
    // useEffect(() => {
    //     console.log(localStorage.getItem("viewJobApplicantsJOBID"))
    // }, [])

  return (
    <div style={{ display: "flex" }}>
      <Navbar name="VIEW_JOBS" type="User" />
      <div style={{ width: "100%" }}>
        <AppBar title="View Applicants For Job (User)" />
        <ViewApplicants />
      </div>
    </div>
  );
}

export default DashboardViewApplicants;
