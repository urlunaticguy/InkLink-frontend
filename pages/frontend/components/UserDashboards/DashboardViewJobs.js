import React, { useState, useEffect } from "react";
import Navbar from "../Dashboard/Navbar";
import AppBar from "../Dashboard/AppBar";
import axios from "axios";
import JobsTable from "../Dashboard/JobsTable";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";

function DashboardViewJobs() {
  const [clientJobsArray, setClientJobsArray] = useState([]);
  useEffect(() => {
    const fetchClientJobs = async () => {
      const user_id_mongo = localStorage.getItem("Mongo_ID");
      const API_URL_CLIENT_GETJOBS = `/api/v1/user/${user_id_mongo}/jobs`;
      try {
        const response = await axios.get(API_URL_CLIENT_GETJOBS);
        // console.log(response.data);
        const destructedData = response.data.data; // array of jobs
        console.log(destructedData)
        if (response.data.message == "success") {
          console.log("Successfully fetched Client Jobs.");
          setClientJobsArray(destructedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientJobs();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Navbar name="VIEW_JOBS" type="User" />
      <div style={{ width: "100%" }}>
        <AppBar title="View Jobs" />
        <div className={styles.example}>
          {/* example class is hiding the scroll bar */}
          <JobsTable rows={clientJobsArray} />
        </div>
      </div>
    </div>
  );
}

export default DashboardViewJobs;
