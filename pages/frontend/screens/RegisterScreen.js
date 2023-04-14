import React, { useEffect, useState } from "react";
import styles from "@/styles/screens/RegisterScreen.module.css";
import RegisterScreenCard from "../components/RegisterScreenCard";
import AgencyHomeScreen from "./AgencyHomeScreen";
import ClientHomeScreen from "./ClientHomeScreen";
import FreelancerHomeScreen from "./FreelancerHomeScreen";

function RegisterScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAgency, setIsAgency] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("isSignedIn");
    if (!(flag == null)) {
      setIsSignedIn(true);
      const type = localStorage.getItem("userType");
      if (type == "agency") {
        setIsAgency(true);
      } else if (type == "user") {
        setIsClient(true);
      }
    }
  }, []);

  return (
    <>
      {isSignedIn ? (
        // if user has previously signed in or registered - this executes
        isAgency ? (
          //if user is agency
          <AgencyHomeScreen />
        ) : isClient ? (
          // if user is client
          <ClientHomeScreen />
        ) : (
          // else if user is freelancer
          <FreelancerHomeScreen />
        )
      ) : (
        // if user has not registered or logged in
        <div className={styles.mainDiv}>
          <RegisterScreenCard />
        </div>
      )}
    </>
  );
}

export default RegisterScreen;
