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
            setJobData(response.data.job)
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
        <h2 style={{ marginTop: "10px", fontSize: "18px"}}>Applicants</h2>
        {/* <div style={{marginTop: "10px", height: "60vh", fontSize: "12px" , backgroundColor: "", overflow: "scroll"}}> */}
        <div style={{width: "100%", display: "flex"}}>
            <div className={styles.example}>
                {jobData.applicants &&
                    jobData.applicants.map((data, index) => (
                        <>
                            <div className={styles.agencyDetails}>
                                <div>
                                    <h2>{data.agency_id}</h2>
                                    <h3>{data.status}</h3>
                                </div>
                                <div className={styles.acceptRejectBtn}>
                                    <button className={[styles.btns, styles.reject].join(" ")}>Reject</button>
                                    <button className={[styles.btns, styles.accept].join(" ")}>Accept</button>
                                </div>
                            </div>
                            
                        </>
                    ))
                }
            </div>
            <div className={styles.scrollable}>
                {/* <h1>Hello</h1> */}
            </div>
        </div>
      </div>
    </>
  );
}

export default ViewApplicants;
