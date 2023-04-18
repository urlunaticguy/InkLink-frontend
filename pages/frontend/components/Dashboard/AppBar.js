import React from "react";
import styles from "@/styles/components/Dashboard/Appbar.module.css";
import { sairaCondensed } from "../../../../utils/fonts";

function AppBar(props) {
  return (
    <div className={styles.root}>
      <h1 className={[sairaCondensed.className].join(" ")}>{props.title}</h1>
    </div>
  );
}

export default AppBar;
