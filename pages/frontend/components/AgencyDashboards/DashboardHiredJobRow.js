import React, { useState, useEffect } from "react";
import NavbarAgency from "../Dashboard/Agency/Navbar";
import AppBar from "../Dashboard/AppBar";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import AgencyOneJob from "../Dashboard/Agency/OneJob";
import axios from "axios";
import { useRouter } from "next/router";

function DashboardHiredJobRow( props ) {
    const router = useRouter();
  const [userID, setUserID] = useState("")
  const [jobID, setJobID] = useState("")
  const [jobResult, setJobResult] = useState(null)

  useEffect(() => {
    let tempUserID = props.userID
    let tempJobID = props.jobID

    if (tempUserID !== null) {
        setUserID(tempUserID)
    }

    if (tempJobID !== null) {
        setJobID(tempJobID)
    }

  }, []);

  useEffect(() => {
    const callEachJob = async () => {
        const API_URL_GET_JOB_DETAILS = `/api/v1/user/${userID}/jobs/${jobID}`
        try {
            const eachJobResponse = await axios.get(API_URL_GET_JOB_DETAILS);
            console.log(eachJobResponse.data.data)
            setJobResult(eachJobResponse.data.data)
            // let newArray = agencyJobsDetails
            // newArray.push(eachJobResponse.data.data)
            // setAgencyJobsDetails(newArray)
            // setAgencyJobsDetails([...agencyJobsDetails, eachJobResponse.data.data])
            console.log("separated")
          } catch (error) {
            console.log(error);
          }
    }

    callEachJob()
  }, [userID, jobID])

  const handlePostButtonClick = () => {
    // const {
    //     title,
    //     details,
    //     salary,
    //     frequency,
    //     location,
    //     job_type,
    //     tags,
    //     status,
    //   } = req.body;
    localStorage.setItem("agencyPostJobID", jobID)
    localStorage.setItem("agencyPostJobTitle", jobResult.title)
    localStorage.setItem("agencyPostJobDetails", jobResult.details)
    localStorage.setItem("agencyPostJobSalary", jobResult.salary)
    localStorage.setItem("agencyPostJobFrequency", jobResult.frequency)
    localStorage.setItem("agencyPostJobLocation", jobResult.location)
    localStorage.setItem("agencyPostJobJobType", jobResult.type)
    localStorage.setItem("agencyPostJobTags", "tags")
    localStorage.setItem("agencyPostJobStatus", jobResult.status)
    router.push("/frontend/components/AgencyDashboards/DashboardPostJob");
  }

  return (
    <div style={{width: "100%", color: "black"}}>
        {jobResult && (
            <div style={{ textAlign: "center", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                <p>{jobResult.title}</p>
                {/* <p>Created on: {jobResult.created_on}</p> */}
                <p>{jobResult.details}</p>
                <p>{jobResult.frequency}</p>
                <p>{jobResult.location}</p>
                <p>{jobResult.salary}</p>
                <p>{jobResult.status}</p>
                <p>{jobResult.type}</p>
                {/* <p>Updated on: {jobResult.updated_on}</p> */}
                <p>{jobResult.user.name}</p>
                <button onClick={() => {handlePostButtonClick()}}>Post</button>
            </div>
        )}
    </div>

  );
}

export default DashboardHiredJobRow;

