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
    const [job, setJob] = useState(
        {
            created_on: "2023-05-02T13:09:35.925Z",
            details: "placeholder",
            frequency: "placeholder",
            location: "placeholder",
            salary: 0,
            status: "placeholder",
            type: "sample type",
            title: "sample title",
        })
    const [jobIndex, setJobIndex] = useState(0)

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
            setJob(props.job)
            setJobIndex(props.index)
            // console.log("Hello for id ", jobsSearchAgency[props.index]._id)
            // fetchJobAppliedStatus(props.job._id, props.index);
            // fetchJobAppliedStatus(jobsSearchAgency[props.index]._id, props.index);
        // }
      }, [props])

      useEffect(() => {
        console.log(job)
        fetchJobAppliedStatus(job._id, jobIndex);
      }, [job, jobIndex])

      const navigateToOneJob = (jobObject, index) => {
        let abc = jobAppliedStatus ? "Applied" : "Not Applied";
        localStorage.setItem("onejob", JSON.stringify(jobObject));
        localStorage.setItem("onejobBool", abc)
        router.push("/frontend/components/AgencyDashboards/DashboardOneJob");
      };
  return (
    <TableRow
        onClick={() => {
            navigateToOneJob(job, jobIndex);
        }}
        className={styles.row}
        key={job._id}>
            <TableCell>
                {jobIndex + 1}
            </TableCell>
            <TableCell>
                {dateInRightFormat(job.created_on)}
            </TableCell>
            <TableCell>
                {job.title}
            </TableCell>
            <TableCell>
                {job.type}
            </TableCell>
            <TableCell>
                {job.location}
            </TableCell>
            <TableCell>
                {job.salary}
            </TableCell>
            <TableCell>
                {job.details}
            </TableCell>
            <TableCell>
                {jobAppliedStatus ? "Applied" : "Not Applied"}
            </TableCell>
    </TableRow>
  );
}

export default SearchJobsTableRow;
