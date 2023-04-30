import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/components/Dashboard/JobsTable.module.css";
import { TableRow, TableCell } from "@material-ui/core";
import { useRouter } from "next/router";

function JobsTableRow(props) {
    const router = useRouter()
    const [jobData, setJobData] = useState()
    
    useEffect(() => {
        console.log(props)
        if (props) {
            fetchJobUser(props.jobID)
        }
    }, []);

    let fetchJobUser = async (jobID) => {
        const id = localStorage.getItem("Mongo_ID")

        const API_URL_GETJOBDETAILS = `/api/v1/user/${id}/jobs/${jobID}`
        try {
            let response = await axios.get(API_URL_GETJOBDETAILS)
            console.log(response.data)
            setJobData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    let navigateToViewApplicants = (id) => {
        // console.log(data._id)
        localStorage.setItem("viewJobApplicantsJOBID", id)
        router.push("/frontend/components/UserDashboards/DashboardViewApplicants")
      }

  return (  <>
                {jobData && 
                    <TableRow
                        className={styles.row}
                        key={jobData._id}
                    >
                        <TableCell component="th" scope="row">
                        {props.index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                        {jobData.title}
                        </TableCell>
                        <TableCell align="right">{jobData.details}</TableCell>
                        <TableCell align="right">{jobData.type}</TableCell>
                        <TableCell align="right">{jobData.status}</TableCell>
                        <TableCell align="right">₹ {jobData.salary}</TableCell>
                        <TableCell align="right">{jobData.location}</TableCell>
                        <TableCell align="right">{jobData.frequency}</TableCell>
                        <TableCell align="right">
                            applicants
                        {jobData.applicants.length == 0 &&
                            <>
                                <p>None</p>
                            </>
                        }
                        {
                            jobData.applicants.length > 0 &&
                            <>
                                <p>{jobData.applicants.length}</p>
                                <button onClick={() => {navigateToViewApplicants(jobData._id)}} className={styles.viewApplicationButton}>View applications</button>
                            </>
                        }
                        </TableCell>
                    </TableRow>
                }
            </>
        );
}

export default JobsTableRow;
