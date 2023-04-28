import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Chip } from "@material-ui/core";
import styles from "@/styles/components/Dashboard/Agency/OneJob.module.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    flexGrow: 1,
    color: "black",
    padding: theme.spacing(4),
    backgroundColor: "white",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: "#7C7C7C",
    fontSize: "1rem",
    marginBottom: theme.spacing(2),
  },
  label: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    fontWeight: 100,
  },
  tag: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "#E8F0FE",
    color: "#1E3A8A",
    borderRadius: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#1E3A8A",
      color: "#FFFFFF",
    },
  },
}));

const AgencyOneJob = (props) => {
  const [job, setJob] = useState({});
  const [agencyID, setAgencyID] = useState("")
  const [jobApplyButtonState, setJobApplyButtonState] = useState(false)
  const [jobApplyButtonText, setJobApplyButtonText] = useState("Apply for job")

  useEffect(() => {
    if (props.job === null) {
      console.log(" YAYAY YAYAYYAY YAYYA YAY YYA ");
      setJob({
        title: "",
        salary: 0,
        //   tags: ["tag1"],
        location: "",
        type: "",
        details: "",
        frequency: "",
        applicants: [],
      });
    } else {
      setJob(JSON.parse(props.job));
    }
    if (localStorage.getItem("onejobBool") === "Applied") {
      setJobApplyButtonText("Already Applied")
      setJobApplyButtonState(true)
    }
    setAgencyID(localStorage.getItem("Mongo_ID"))
  }, []);

  useEffect(() => {
    let arr = job.applicants

    if (arr === undefined) {
      arr = [{ agency_id : "sadacdnhan"}]
    }
  }, [job])

  const applyForJob = async (jobID) => {
    // console.log("ABEY")
    console.log(agencyID)
    const API_URL_AGENCY_APPLYJOB = `/api/v1/agency/${agencyID}/jobs/${jobID}/apply`;
    // const API_URL_AGENCY_APPLYJOB = `/api/v1/jobs?userId=${userID}&agencyId=${agencyID}&jobId=${jobID}`;
    try {
      const response = await axios.post(API_URL_AGENCY_APPLYJOB);
      console.log(response.data);
      // const destructedData = response.data.data; // array of jobs
      if (response.data.message == "success") {
        console.log("Successfully applied for JOB.");
        setJobApplyButtonText("Applied successfully.")
        setJobApplyButtonState(true)
      //   setAllJobs(destructedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        {job.title}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.label}>
            Job Salary
          </Typography>
          <Typography variant="h4">₹ {job.salary}</Typography>
          <Typography variant="h6" className={classes.label}>
            Job Location
          </Typography>
          <Typography variant="h4">{job.location}</Typography>
          <Typography variant="h6" className={classes.label}>
            Job Type
          </Typography>
          <Typography variant="h4">{job.type}</Typography>
          <Typography variant="h6" className={classes.label}>
            Job Details
          </Typography>
          <Typography variant="h4">{job.details}</Typography>
          <Typography variant="h6" className={classes.label}>
            Frequency
          </Typography>
          <Typography variant="h4">{job.frequency}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.label}>
            Tags
          </Typography>
          {job.tags &&
            job.tags.map((tag) => (
              <Chip
                style={{ cursor: "pointer" }}
                key={tag}
                label={tag}
                className={classes.tag}
              />
            ))}
            <div>
              <button disabled={jobApplyButtonState} onClick={() => {applyForJob(job._id)}} className={styles.applyButton}>{jobApplyButtonText}</button>
            </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AgencyOneJob;
