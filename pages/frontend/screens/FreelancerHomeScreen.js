import React from "react";
import GoogleButton from "../components/Google Material Design/GoogleButton";
import { useRouter } from "next/router";

function FreelancerHomeScreen() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    router.push("/");
  };
  return (
    <>
      <div>This is freelancer home screen.</div>{" "}
      <GoogleButton onClick={handleLogout} label="Logout Freelancer" />
    </>
  );
}

export default FreelancerHomeScreen;
