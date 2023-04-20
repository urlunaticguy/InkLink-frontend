import React, { useState, useEffect } from "react";
import styles from "@/styles/components/Dashboard/PostJobSuccess.module.css";
import { sairaCondensed } from "../../../../utils/fonts";
import { useRouter } from "next/router";

function PostJobSuccess() {
  const router = useRouter();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      router.push("/frontend/components/UserDashboards/DashboardViewJobs");
    }, 10000);
  }, []);

  return (
    <div className={styles.root}>
      <h2 className={[sairaCondensed.className].join(" ")}>
        Successfully posted a job ✅
      </h2>
      <h2 className={[sairaCondensed.className].join(" ")}>
        Redirecting to View Jobs in 10 seconds.
      </h2>
    </div>
  );
}

export default PostJobSuccess;
