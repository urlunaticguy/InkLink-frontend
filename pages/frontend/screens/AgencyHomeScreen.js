import React from "react";
import { useRouter } from "next/router";
import DashboardHomeAgency from "../components/DashboardHomeAgency";

function AgencyHomeScreen() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    router.push("/");
  };
  return (
    <>
      {/* <div>Welcome to agency home page.</div>{" "}
      <GoogleButton onClick={handleLogout} label="Logout Agency" /> */}
      <DashboardHomeAgency />
    </>
  );
}

export default AgencyHomeScreen;
