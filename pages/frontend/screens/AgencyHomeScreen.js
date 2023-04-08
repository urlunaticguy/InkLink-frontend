import React from "react";
import GoogleButton from "../components/Google Material Design/GoogleButton";
import { useRouter } from "next/router";

function AgencyHomeScreen() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    router.push("/");
  };
  return (
    <>
      <div>Welcome to agency home page.</div>{" "}
      <GoogleButton onClick={handleLogout} label="Logout Agency" />
    </>
  );
}

export default AgencyHomeScreen;
