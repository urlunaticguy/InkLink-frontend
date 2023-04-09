import React, { useState } from "react";
import styles from "@/styles/components/CreateJobClient.module.css";
import GoogleButton from "./Google Material Design/GoogleButton";
import { useRouter } from "next/router";
import axios from "axios";

function ClientCreateJobCard() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [salary, setSalary] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleJobDetailsChange = (event) => {
    setJobDetails(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleJobStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user_id_mongo = localStorage.getItem("Mongo_ID");
    const API_URL_CLIENT_POSTJOB = `/api/v1/user/${user_id_mongo}/jobs`;
    const postJobData = {
      title: jobTitle,
      details: jobDetails,
      salary: salary,
      frequency: frequency,
      location: location,
      type: jobType,
      tags: ["tagOne", "tagTwo"],
      status: jobStatus,
    };
    try {
      const response = await axios.post(API_URL_CLIENT_POSTJOB, postJobData);
      console.log(response.data);
      if (response.data.message == "success") {
        router.push("/frontend/screens/ClientScreens/CreateJobCompletedScreen");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.inputs}
          type="text"
          placeholder="Job Title"
          onChange={handleJobTitleChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Job Details"
          onChange={handleJobDetailsChange}
        />
        <input
          className={styles.inputs}
          type="number"
          placeholder="Salary"
          onChange={handleSalaryChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Frequency"
          onChange={handleFrequencyChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Location"
          onChange={handleLocationChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Job Type"
          onChange={handleJobTypeChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Job Status (choose - active or inactive or hold"
          onChange={handleJobStatusChange}
        />
        <input
          className={styles.inputs}
          type="text"
          placeholder="Tags (don't enter now)"
        />
        <GoogleButton type="submit" label="Submit" />
      </form>
    </div>
  );
}

export default ClientCreateJobCard;
