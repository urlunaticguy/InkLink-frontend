import React from "react";
import ClientCreateJobCard from "../../components/ClientCreateJobCard";
import styles from "@/styles/screens/ClientScreens/CreateJobScreen.module.css";

function CreateJobScreen() {
  return (
    <>
      <div className={styles.body}>This is Create Job Screen under Client</div>
      <ClientCreateJobCard />
    </>
  );
}

export default CreateJobScreen;
