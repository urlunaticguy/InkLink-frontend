import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import styles from "@/styles/components/Dashboard/Agency/SearchJobs.module.css";
import { useRouter } from "next/router";
import axios from "axios";

const AgencySearchJobs = (props) => {
  const router = useRouter();
  const [jobApplyBoolArray, setJobApplyBoolArray] = useState([false, false, false, false, false, false, false, false, false, false])

  const dateInRightFormat = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const fetchJobAppliedStatus = async (jobID, index) => {
    let JOBID = jobID;
    if (JOBID === undefined) {
      return false;
    }
    let agencyID = localStorage.getItem("Mongo_ID");
    let arr = jobApplyBoolArray;
    const API_URL_AGENCY_JOB_APPLIED_STATUS = `/api/v1/agency/${agencyID}/jobs/${JOBID}/apply`;
    try {
      const response = await axios.get(API_URL_AGENCY_JOB_APPLIED_STATUS);
      // console.log(response.data);
      if (response.data.data === "true") {
        setJobApplyBoolArray([])
        arr[index] = true;
        setJobApplyBoolArray(arr);
      } else {
        setJobApplyBoolArray([])
        arr[index] = false;
        setJobApplyBoolArray(arr)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (props.data) {
      for (let i = 0; i < props.data.length; i++) {
        fetchJobAppliedStatus(props.data[i]._id, i)
      }
    }
  }, [props.data])

  const navigateToOneJob = (jobObject, index) => {
    // console.log(jobObject)
    let abc = jobApplyBoolArray[index] ? "Applied" : "Not Applied";
    localStorage.setItem("onejob", JSON.stringify(jobObject));
    localStorage.setItem("onejobBool", abc)
    router.push("/frontend/components/AgencyDashboards/DashboardOneJob");
  };

  return (
    <TableContainer className={styles.root} component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableHeadRow}>
            <TableCell>
              <p className={styles.tableHeadRow}>#</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Date Created</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Title</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Type</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Location</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Salary</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>Details</p>
            </TableCell>
            <TableCell>
              <p className={styles.tableHeadRow}>My Job Status</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {props.data &&
            props.data.map((job, index) => (
              <TableRow
                onClick={() => {
                  navigateToOneJob(job, index);
                }}
                className={styles.row}
                key={job._id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dateInRightFormat(job.created_on)}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.details}</TableCell>
                <TableCell>
                  {jobApplyBoolArray[index]
                    ? "Applied"
                    : "Not Applied"
                  }
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default AgencySearchJobs;
