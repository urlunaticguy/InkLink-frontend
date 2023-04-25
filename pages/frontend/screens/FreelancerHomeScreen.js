import React from "react";
import { useRouter } from "next/router";
import DashboardHomeFreelancer from "../components/DashboardHomeFreelancer";

function FreelancerHomeScreen() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    router.push("/");
  };
  return (
    <>
      {/* <div>This is freelancer home screen.</div>{" "}
      <GoogleButton onClick={handleLogout} label="Logout Freelancer" /> */}
      <DashboardHomeFreelancer />
    </>
  );
}

export default FreelancerHomeScreen;
