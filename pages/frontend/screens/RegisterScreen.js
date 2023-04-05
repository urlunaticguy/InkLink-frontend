import React, { useEffect, useState } from "react";
import styles from "@/styles/screens/RegisterScreen.module.css";
import RegisterScreenCard from "../components/RegisterScreenCard";
import AgencyHomeScreen from "./AgencyHomeScreen";

function RegisterScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const flag = localStorage.getItem("isSignedIn");
    if (!(flag == null)) {
      setIsSignedIn(true);
    }
    console.log(localStorage.getItem("data"));
  }, []);

  return (
    <>
      {isSignedIn ? (
        <AgencyHomeScreen />
      ) : (
        <div className={styles.mainDiv}>
          <RegisterScreenCard
            parentStyleClass={styles.parentCard}
            formStyleClass={styles.formCard}
            imageStyleClass={styles.imageCard}
          />
        </div>
      )}
    </>
  );
}

export default RegisterScreen;
