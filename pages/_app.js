import "@/styles/globals.css";
import { useState } from "react";
import MyContext from "@/context/MyContext";

export default function App({ Component, pageProps }) {
  const [jobsSearchAgency, setJobsSearchAgency] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
  ]);

  const [jobsSearchAgencyBools, setJobsSearchAgencyBools] = useState([])

  const updateJobsSearchAgency = (newData) => {
    setJobsSearchAgency(newData);
  };

  const updateNew = (newValue, key) => {
    if (key === 1) {
      setJobsSearchAgencyBools(newValue);
    } else {
      // setJobsSearchAgencyBools(...newData)
      setJobsSearchAgencyBools(prevState => [...prevState, newValue])
    }
  }
  return (
    <MyContext.Provider 
      value={{ jobsSearchAgency, updateJobsSearchAgency,
                jobsSearchAgencyBools, updateNew }}>
      <Component {...pageProps} />;
    </MyContext.Provider>
  )
}
