import React, { useState, useEffect } from "react";
import NavbarFreelancer from "../Dashboard/Freelancer/Navbar";
import AppBar from "../Dashboard/AppBar";
import axios from "axios";
import FreelancerSearchAgencies from "../Dashboard/Freelancer/SearchAgencies";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";

function DashboardSearchAgencies() {
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    const fetchClientJobs = async () => {
      const API_URL_CLIENT_GETJOBS = `/api/v1/agency?skip=0&limit=1`;
      try {
        const response = await axios.get(API_URL_CLIENT_GETJOBS);
        console.log(response.data);
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
      <NavbarFreelancer name="SEARCH_AGENCY" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="Search Jobs" />
        <div className={styles.example}>
          <FreelancerSearchAgencies data={allJobs} />
        </div>
      </div>
    </div>
  );
}

export default DashboardSearchAgencies;
