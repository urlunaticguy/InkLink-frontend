import React, { useState, useEffect } from "react";
import NavbarAgency from "../Dashboard/Agency/Navbar";
import AppBar from "../Dashboard/AppBar";
import axios from "axios";
import AgencySearchJobs from "../Dashboard/Agency/SearchJobs";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import AgencyOneJob from "../Dashboard/Agency/OneJob";

function DashboardSearchJobs() {
  let xxx = localStorage.getItem("onejob");
  console.log("hEYA");
  console.log(xxx);
  //   const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    // console.log(localStorage.getItem("onejob"));
    // const fetchClientJobs = async () => {
    //   //   const user_id_mongo = localStorage.getItem("Mongo_ID");
    //   const API_URL_CLIENT_GETJOBS = `/api/v1/agency/jobs`;
    //   try {
    //     const response = await axios.get(API_URL_CLIENT_GETJOBS);
    //     console.log(response.data);
    //     const destructedData = response.data.data; // array of jobs
    //     if (response.data.message == "success") {
    //       console.log("Successfully fetched All Jobs.");
    //       setAllJobs(destructedData);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchClientJobs();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <NavbarAgency name="SEARCH_JOBS" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="View One Job" />
        <div className={styles.example}>
          {/* pass particular job here - sort it out how to pass */}
          <AgencyOneJob job={xxx} />
          {/* <AgencySearchJobs data={allJobs} /> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardSearchJobs;
