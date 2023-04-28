import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/components/Dashboard/JobsTable.module.css";
import { useRouter } from "next/router";

export default function JobsTable(props) {
  const router = useRouter()
  let navigateToViewApplicants = (data) => {
    console.log(data._id)
    localStorage.setItem("viewJobApplicantsJOBID", data._id)
    router.push("/frontend/components/UserDashboards/DashboardViewApplicants")
  }
  return (
    <TableContainer style={{ height: "90vh" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Frequency</TableCell>
            <TableCell align="right">Applicants</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows &&
            props.rows.map((row, index) => (
              <TableRow
                className={styles.row}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.details}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">₹ {row.salary}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.frequency}</TableCell>
                <TableCell align="right">
                  {row.applicants.length == 0 &&
                    <>
                      <p>None</p>
                    </>
                  }
                  {
                    row.applicants.length > 0 &&
                      <>
                        <p>{row.applicants.length}</p>
                        <button onClick={() => {navigateToViewApplicants(row)}} className={styles.viewApplicationButton}>View applications</button>
                      </>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
