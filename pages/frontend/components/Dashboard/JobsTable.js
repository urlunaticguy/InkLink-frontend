import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/components/Dashboard/JobsTable.module.css";

export default function JobsTable(props) {
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
