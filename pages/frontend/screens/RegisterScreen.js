import React from "react";
import styles from "@/styles/screens/RegisterScreen.module.css";
import RegisterScreenCard from "../components/RegisterScreenCard";

function RegisterScreen() {
  return (
    <div className={styles.mainDiv}>
      <RegisterScreenCard
        parentStyleClass={styles.parentCard}
        formStyleClass={styles.formCard}
        imageStyleClass={styles.imageCard}
      />
    </div>
  );
}

export default RegisterScreen;
