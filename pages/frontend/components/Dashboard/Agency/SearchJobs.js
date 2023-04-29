import React, { useContext } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import styles from "@/styles/components/Dashboard/Agency/SearchJobs.module.css";
import MyContext from "@/context/MyContext";
import SearchJobsTableRow from "./SearchJobsTableRow";

const AgencySearchJobs = () => {
  const { jobsSearchAgency, updateJobsSearchAgency, jobsSearchAgencyBools, updateNew } = useContext(MyContext);

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
          {jobsSearchAgency &&
            jobsSearchAgency.map((job, index) => (
              <SearchJobsTableRow job={job} index={index} />
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default AgencySearchJobs;
