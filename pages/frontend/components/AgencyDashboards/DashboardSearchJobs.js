import React, { useState, useEffect } from "react";
import NavbarAgency from "../Dashboard/Agency/Navbar";
import AppBar from "../Dashboard/AppBar";
import axios from "axios";
import AgencySearchJobs from "../Dashboard/Agency/SearchJobs";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";

function DashboardSearchJobs() {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchClientJobs = async () => {
      const API_URL_CLIENT_GETJOBS = `/api/v1/agency/jobs`;
      try {
        const response = await axios.get(API_URL_CLIENT_GETJOBS);
        // console.log(response.data);
        const destructedData = response.data.data; // array of jobs
        if (response.data.message == "success") {
          console.log("Successfully fetched All Jobs.");
          setAllJobs(destructedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientJobs();
  }, []);
  
  return (
    <div style={{ display: "flex" }}>
      <NavbarAgency name="SEARCH_JOBS" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="Search Jobs" />
        <div className={styles.example}>
          <AgencySearchJobs data={allJobs} />
        </div>
      </div>
    </div>
  );
}

export default DashboardSearchJobs;
