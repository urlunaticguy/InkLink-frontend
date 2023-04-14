import React from "react";
import RegisterCard from "./RegisterCard";
import ImageSlideShow from "./ImageSlideShow";
import styles from "@/styles/components/RegisterScreenCard.module.css";

function RegisterScreenCard() {
  return (
    <div className={styles.mainCard}>
      <ImageSlideShow />
      <RegisterCard />
    </div>
  );
}

export default RegisterScreenCard;
