import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import GoogleButton from "../../components/Google Material Design/GoogleButton";

function ClientJobsScreen() {
  const [clientJobsArray, setClientJobsArray] = useState([]);
  useEffect(() => {
    const fetchClientJobs = async () => {
      const user_id_mongo = localStorage.getItem("Mongo_ID");
      const API_URL_CLIENT_GETJOBS = `/api/v1/user/${user_id_mongo}/jobs`;
      try {
        const response = await axios.get(API_URL_CLIENT_GETJOBS);
        // console.log(response.data);
        const destructedData = response.data.data; // array of jobs
        if (response.data.message == "success") {
          console.log("Successfully fetched Client Jobs.");
          setClientJobsArray(destructedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientJobs();
  }, []);

  return (
    <>
      <div>Here you will see all jobs posted by the Client</div>
      <Link href="/frontend/screens/ClientHomeScreen">
        <GoogleButton label="Go back to Client Home" />
      </Link>
      <div>
        {/* map all client jobs in this div */}
        {clientJobsArray.map((data, index) => (
          <div key={data._id}>
            <h1>Job Title - {data.title}</h1>
            <h2>Job Details - {data.details}</h2>
            <h2>Job Type - {data.type}</h2>
            <h2>Job Status - {data.status}</h2>
            <h2>Job Salary - {data.salary}</h2>
            <h2>Job Location - {data.location}</h2>
            <h2>Job Frequency - {data.frequency}</h2>
            <h1>-------------------------</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default ClientJobsScreen;
