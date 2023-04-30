import React, { useState, useEffect } from "react";
import styles from "@/styles/components/Dashboard/ViewApplicants.module.css";
import { sairaCondensed } from "../../../../utils/fonts";
import axios from "axios";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ViewApplicants() {
  const router = useRouter();

  const [jobData, setJobData] = useState({})
  const [agencyData, setAgencyData] = useState({})
  const [agencyClicked, setAgencyClicked] = useState(false)
//   const [agenciesData, setAgenciesData] = useState([])

  useEffect(() => {
    // console.log(localStorage.getItem("viewJobApplicantsJOBID"))
    let lol = async () => {
        let id = localStorage.getItem("Mongo_ID")
        let jobID = localStorage.getItem("viewJobApplicantsJOBID")
        const API_URL_CLIENT_GETJOBDETAILS = `/api/v1/user/${id}/jobs/${jobID}`;
        // const API_URL_CLIENT_POSTJOB = `/api/v1/user/${user_id_mongo}/jobs`;
        try {
            const response = await axios.get(API_URL_CLIENT_GETJOBDETAILS);
            console.log(response.data)
            setJobData(response.data.data)
            // for (let i = 0; i < response.data.job.applicants.length; i++) {
            //     await jol(response.data.job.applicants[i].agency_id)
            // }
        } catch (error) {
            console.log(error)
        }
    }
    
    lol();
    }, [])

    // let jol = async (id) => {
    //     const API_URL_CLIENT_GETAGENCYDETAILS = `/api/v1/agency/${id}`
    //     try {
    //         const responseNew = await axios.get(API_URL_CLIENT_GETAGENCYDETAILS)
    //         console.log(responseNew.data)
    //         let newArr = agenciesData;
    //         newArr.push(responseNew.data.data)
    //         setAgenciesData(newArr)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    let hireAgencyApiCall = async (agencyID) => {
        let userID = localStorage.getItem("Mongo_ID")
        let jobID = localStorage.getItem("viewJobApplicantsJOBID")
        const API_URL_HIRE_AGENCY = `/api/v1/user/${userID}/jobs/${jobID}/hire/${agencyID}`
        try {
            const response = await axios.put(
                API_URL_HIRE_AGENCY, 
                JSON.stringify({duration : "1 day"})
            )
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    let rejectAgencyApiCall = async (agencyID) => {
        let userID = localStorage.getItem("Mongo_ID")
        let jobID = localStorage.getItem("viewJobApplicantsJOBID")
        const API_URL_REJECT_AGENCY = `/api/v1/user/${userID}/jobs/${jobID}/reject/${agencyID}`
        try {
            const response = await axios.put(API_URL_REJECT_AGENCY)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    let getAgencyDetails = async (id) => {
        const API_URL_GETAGENCY = `/api/v1/agency/${id}`
        try {
            const response = await axios.get(API_URL_GETAGENCY)
            console.log(response.data)
            setAgencyData(response.data.data)
            setAgencyClicked(true)
        } catch (error) {
            console.log(error)
        }

    }

    // useEffect(() => {
    //     console.log(agenciesData)
    // }, [agenciesData])

  return (
    <>
      <div className={styles.root}>
        {/* <h2 className={[sairaCondensed.className].join(" ")}>See your Applicants</h2> */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Salary</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        className={styles.row}
                        key={1}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {jobData.title}
                        </TableCell>
                        <TableCell align="right">{jobData.details}</TableCell>
                        <TableCell align="right">{jobData.type}</TableCell>
                        <TableCell align="right">{jobData.status}</TableCell>
                        <TableCell align="right">₹ {jobData.salary}</TableCell>
                        <TableCell align="right">{jobData.location}</TableCell>
                        <TableCell align="right">{jobData.frequency}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        {!jobData.hired_agency ?
            <>
                <h2 style={{ marginTop: "10px", fontSize: "18px"}}>View your Applicants</h2>
                <div style={{width: "100%", display: "flex"}}>
                    <div className={styles.example}>
                        {jobData.applicants &&
                            jobData.applicants.map((data, index) => (
                                <>
                                    <div className={styles.agencyDetails}>
                                        <div>
                                            <h2 onClick={() => {getAgencyDetails(data.agency._id)}}>{data.agency.name}</h2>
                                            <h3>{data.status}</h3>
                                        </div>
                                        <div className={styles.acceptRejectBtn}>
                                            <button
                                                onClick={() => {rejectAgencyApiCall(data.agency._id)}}
                                                className={[styles.btns, styles.reject].join(" ")}>Reject</button>
                                            <button 
                                                onClick={() => {hireAgencyApiCall(data.agency._id)}}
                                                className={[styles.btns, styles.accept].join(" ")}>Accept</button>
                                        </div>
                                    </div>
                                    
                                </>
                            ))
                        }
                    </div>
                    <div className={styles.scrollable}>
                        {agencyClicked &&
                            <>
                                <h2>Agency Name - {agencyData.name}</h2>
                                <h2>Agency Email - {agencyData.email}</h2>
                                <h2>Jobs Assigned - {agencyData.jobs_hired.length}</h2>
                            </>
                        }
                    </div>
                </div>
            </>
            :
            <>
                <h2>An agency has already been hired</h2>
            </>
        }
      </div>
    </>
  );
}

export default ViewApplicants;
