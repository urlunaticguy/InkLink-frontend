import { TableCell, TableRow } from "@material-ui/core";
import styles from "@/styles/components/Dashboard/Agency/SearchJobs.module.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MyContext from "@/context/MyContext";

function SearchJobsTableRow(props) {
    const { jobsSearchAgency, updateJobsSearchAgency, jobsSearchAgencyBools, updateNew } = useContext(MyContext);
    const router = useRouter()
    const [jobAppliedStatus, setJobAppliedStatus] = useState(false)
    const dateInRightFormat = (dateString) => {
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        return formattedDate;
      };

      const fetchJobAppliedStatus = async (JOBID, index) => {
        // setInterval(async () => {
            let agencyID = localStorage.getItem("Mongo_ID");
            const API_URL_AGENCY_JOB_APPLIED_STATUS = `/api/v1/agency/${agencyID}/jobs/${JOBID}/apply`;
            try {
            const response = await axios.get(API_URL_AGENCY_JOB_APPLIED_STATUS);
            console.log(response.data);
            if (response.data.data === "true") {
                setJobAppliedStatus(!jobAppliedStatus)
                setJobAppliedStatus(true)
            }
            } catch (error) {
            console.error(error);
            }
        // }, 1000);
      };

      useEffect(() => {
        // if (props.index) {
            console.log("Hello for id ", jobsSearchAgency[props.index]._id)
            fetchJobAppliedStatus(props.job._id, props.index);
            fetchJobAppliedStatus(jobsSearchAgency[props.index]._id, props.index);
        // }
      }, [props])

      const navigateToOneJob = (jobObject, index) => {
        let abc = jobAppliedStatus ? "Applied" : "Not Applied";
        localStorage.setItem("onejob", JSON.stringify(jobObject));
        localStorage.setItem("onejobBool", abc)
        router.push("/frontend/components/AgencyDashboards/DashboardOneJob");
      };
  return (
    <TableRow
        onClick={() => {
            navigateToOneJob(props.job, props.index);
        }}
        className={styles.row}
        key={props.job._id}>
            <TableCell>
                {props.index + 1}
            </TableCell>
            <TableCell>
                {dateInRightFormat(props.job.created_on)}
            </TableCell>
            <TableCell>
                {props.job.title}
            </TableCell>
            <TableCell>
                {props.job.type}
            </TableCell>
            <TableCell>
                {props.job.location}
            </TableCell>
            <TableCell>
                {props.job.salary}
            </TableCell>
            <TableCell>
                {props.job.details}
            </TableCell>
            <TableCell>
                {jobAppliedStatus ? "Applied" : "Not Applied"}
            </TableCell>
    </TableRow>
  );
}

export default SearchJobsTableRow;
