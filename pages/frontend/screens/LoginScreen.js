import React from "react";
import LoginCard from "../components/LoginCard";
import ImageSlideShow from "../components/ImageSlideShow";
import styles from "@/styles/screens/LoginScreen.module.css";

function LoginScreen() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        backgroundColor: "#FFF9C4",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className={styles.mainCard}>
        <LoginCard />
        <ImageSlideShow />
      </div>
    </div>
  );
}

export default LoginScreen;
