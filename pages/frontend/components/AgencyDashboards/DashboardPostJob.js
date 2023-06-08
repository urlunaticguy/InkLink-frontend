import React, { useEffect, useState } from "react";
import NavbarAgency from "../Dashboard/Agency/Navbar";
import AppBar from "../Dashboard/AppBar";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import axios from "axios";

function DashboardPostJob() {
    const [jobID, setJobID] = useState("")
  const [agencyHiredJobs, setAgencyHiredJobs] = useState([])
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [salary, setSalary] = useState("")
  const [frequency, setFrequency] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [tags, setTags] = useState("")
  const [status, setStatus] = useState("")
  
  useEffect(() => {
    let tempJobTitle = localStorage.getItem("agencyPostJobTitle")
    if (tempJobTitle !== null) {
        setTitle(tempJobTitle)
    }
    let tempJobDetails = localStorage.getItem("agencyPostJobDetails")
    if (tempJobDetails !== null) {
        setDetails(tempJobDetails)
    }

    let tempSalary = localStorage.getItem("agencyPostJobSalary");
    if (tempSalary !== null) {
        setSalary(tempSalary);
    }

    let tempFrequency = localStorage.getItem("agencyPostJobFrequency");
    if (tempFrequency !== null) {
        setFrequency(tempFrequency);
    }

    let tempLocation = localStorage.getItem("agencyPostJobLocation");
    if (tempLocation !== null) {
        setLocation(tempLocation);
    }

    let tempJobType = localStorage.getItem("agencyPostJobJobType");
    if (tempJobType !== null) {
        setJobType(tempJobType);
    }

    let tempTags = localStorage.getItem("agencyPostJobTags");
    if (tempTags !== null) {
        setTags(tempTags);
    }

    let tempStatus = localStorage.getItem("agencyPostJobStatus");
    if (tempStatus !== null) {
        setStatus(tempStatus);
    }
    // setSalary(localStorage.getItem("agencyPostJobSalary", jobResult.salary))
    // setFrequency(localStorage.getItem("agencyPostJobFrequency", jobResult.frequency))
    // setLocation(localStorage.getItem("agencyPostJobLocation", jobResult.location))
    // setJobType(localStorage.getItem("agencyPostJobJobType", jobResult.type))
    // setTags(localStorage.getItem("agencyPostJobTags", "tags"))
    // setStatus(localStorage.getItem("agencyPostJobStatus", jobResult.status))
    // const handleSubmit = async () => {
    //   const agencyID = localStorage.getItem("Mongo_ID")
    //   const API_URL_AGENCY_DETAILS = `/api/v1/agency/${agencyID}`;
    //   try {
    //     const response = await axios.get(API_URL_AGENCY_DETAILS);
    //     // console.log(response.data);
    //     const receivedData = response.data.data;
    //     console.log(receivedData)
    //     setAgencyHiredJobs(receivedData.jobs_hired)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    
    // handleSubmit()
  }, [])

  const postJobByAgency = async () => {
    let tempJobID = localStorage.getItem("agencyPostJobID")
    if (tempJobID !== null) {
        setJobID(tempJobID)
    }
    const data = {
        title : title,
        details : details,
        salary : salary,
        frequency : frequency,
        location : location,
        job_type : jobType,
        tags : tags,
        status : status,
    }
    const agencyID = localStorage.getItem("Mongo_ID")
    const API_URL_POST_JOB_FOR_FREELANCER = `/api/v1/agency/${agencyID}/jobs/${jobID}/post`;
    try {
        const response = await axios.post(API_URL_POST_JOB_FOR_FREELANCER, data);
        console.log(response.data);
        // const receivedData = response.data.data;
        // console.log(receivedData)
        // setAgencyHiredJobs(receivedData.jobs_hired)
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <NavbarAgency name="HOME" type="Agency" />
      <div style={{ width: "100%" }}>
        <AppBar title="Home" />
        <div className={styles.example} style={{backgroundColor: "white", color: "black", display: "flex", flexDirection: "column", gap: 15, paddingTop: 10, paddingLeft: 10}}>
          <div style={{ display: "flex", gap: 10}}>
            <label>Job Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ paddingLeft: 5, paddingRight: 5 }}/>
          </div>
          <div style={{ display: "flex", gap: 10}}>
            <label>Job Details</label>
            <input value={details} onChange={(e) => setDetails(e.target.value)} style={{ paddingLeft: 5, paddingRight: 5 }}/>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <label>Salary</label>
            <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
            <label>Frequency</label>
            <input
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
            <label>Location</label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
            <label>Job Type</label>
            <input
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
            <label>Tags</label>
            <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
            <label>Status</label>
            <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ paddingLeft: 5, paddingRight: 5 }}
            />
            </div>
            <button onClick={() => {
                postJobByAgency()
            }}>
                POST JOB
            </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPostJob;
