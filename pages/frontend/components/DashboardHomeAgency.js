import React, { useEffect, useState } from "react";
import NavbarAgency from "./Dashboard/Agency/Navbar";
import AppBar from "./Dashboard/AppBar";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import axios from "axios";
import DashboardHiredJobRow from "./AgencyDashboards/DashboardHiredJobRow";

function DashboardHomeAgency() {
  const [agencyHiredJobs, setAgencyHiredJobs] = useState([])
  
  useEffect(() => {
    const handleSubmit = async () => {
      const agencyID = localStorage.getItem("Mongo_ID")
      const API_URL_AGENCY_DETAILS = `/api/v1/agency/${agencyID}`;
      try {
        const response = await axios.get(API_URL_AGENCY_DETAILS);
        // console.log(response.data);
        const receivedData = response.data.data;
        console.log(receivedData)
        setAgencyHiredJobs(receivedData.jobs_hired)
      } catch (error) {
        console.error(error);
      }
    };
    
    handleSubmit()
  }, [])

  return (
    <div style={{ display: "flex" }}>
      <NavbarAgency name="HOME" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="Home" />
        <div className={styles.example} style={{backgroundColor: "white"}}>
          <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 15}}>
            <div style={{ color: "black", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                <p>Job Title</p>
                {/* <p>Created on: {jobResult.created_on}</p> */}
                <p>Details</p>
                <p>Frequency</p>
                <p>Location</p>
                <p>Salary</p>
                <p>Status</p>
                <p>Type</p>
                {/* <p>Updated on: {jobResult.updated_on}</p> */}
                <p>User</p>
            </div>
            {agencyHiredJobs && 
              agencyHiredJobs.map((data, index) => (
                <div key={index}>
                  <DashboardHiredJobRow userID={data.user_id} jobID={data._id} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHomeAgency;
