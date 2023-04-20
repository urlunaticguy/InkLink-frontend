import React, { useState } from "react";
import styles from "@/styles/components/Dashboard/PostJobForm.module.css";
import { sairaCondensed } from "../../../../utils/fonts";
import { TextField } from "@mui/material";
import { Chip } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function PostJobForm() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [salary, setSalary] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  const handleChange = (event) => {
    setJobStatus(event.target.value);
  };

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

  const handleSubmit = async () => {
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
        router.push(
          "/frontend/components/UserDashboards/DashboardPostJobSuccess"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.root}>
        <h2 className={[sairaCondensed.className].join(" ")}>Post a new job</h2>
        <div className={styles.form}>
          <div className={styles.formSub}>
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Job Title"
              variant="outlined"
              //   color={emailBoxColor}
              type={"text"}
              onChange={handleJobTitleChange}
            />
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Job Details"
              variant="outlined"
              //   color={emailBoxColor}
              type={"text"}
              onChange={handleJobDetailsChange}
            />
          </div>
          <div className={styles.formSub}>
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Salary"
              variant="outlined"
              //   color={emailBoxColor}
              type={"number"}
              onChange={handleSalaryChange}
            />
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Frequency"
              variant="outlined"
              //   color={emailBoxColor}
              type={"text"}
              onChange={handleFrequencyChange}
            />
          </div>
          <div className={styles.formSub}>
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Location"
              variant="outlined"
              //   color={emailBoxColor}
              type={"text"}
              onChange={handleLocationChange}
            />
            <TextField
              //   error={emailError}
              //   helperText={emailHelper}
              fullWidth
              id="outlined-basic"
              label="Job Type"
              variant="outlined"
              //   color={emailBoxColor}
              type={"text"}
              onChange={handleJobTypeChange}
            />
          </div>
          <div className={styles.jobStatusChips}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jobStatus}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>In-Active</MenuItem>
                <MenuItem value={"hold"}>Hold</MenuItem>
              </Select>
            </FormControl>
          </div>
          <button
            className={styles.submitButton}
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default PostJobForm;
