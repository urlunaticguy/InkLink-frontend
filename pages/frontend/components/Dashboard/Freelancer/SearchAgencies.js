import React from "react";
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

const FreelancerSearchAgencies = (props) => {
  const router = useRouter();
  const dateInRightFormat = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

//   const agencyJobRelationStatus = (applicantsArray) => {
//     let agencyMongoID = localStorage.getItem("Mongo_ID");
//     for (let i = 0; i < applicantsArray.length; i++) {
//       if (agencyMongoID === applicantsArray[i]) {
//         return true;
//       }
//     }
//     return false;
//   };

  const navigateToOneJob = (jobObject) => {
    localStorage.setItem("onejob", JSON.stringify(jobObject));
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
            {/* <TableCell>
              <p className={styles.tableHeadRow}>Date Created</p>
            </TableCell> */}
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
            {/* <TableCell>
              <p className={styles.tableHeadRow}>My Job Status</p>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <tbody>
          {props.data &&
            props.data.map((job, index) => (
              <TableRow
                onClick={() => {
                  navigateToOneJob(job);
                }}
                className={styles.row}
                key={job._id}
              >
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell>{dateInRightFormat(job.created_on)}</TableCell> */}
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.details}</TableCell>
                {/* <TableCell>
                  {agencyJobRelationStatus(job.applicants)
                    ? "Applied"
                    : "Not Applied"}
                </TableCell> */}
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default FreelancerSearchAgencies;
