import React from "react";
import Link from "next/link";
import GoogleButton from "../components/Google Material Design/GoogleButton";
import { useRouter } from "next/router";
function ClientHomeScreen() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    router.push("/");
  };
  return (
    <div>
      This is Client Home Screen.
      <div>This is Client Job Posting button</div>
      <div>Figma reference - Post a new Requirement</div>
      <Link href="/frontend/screens/ClientScreens/CreateJobScreen">
        <GoogleButton label="POST A NEW REQUIREMENT" />
      </Link>
      <Link href="/frontend/screens/ClientScreens/ClientJobsScreen">
        <GoogleButton label="View my jobs" />
      </Link>
      <GoogleButton onClick={handleLogout} label="Logout User" />
    </div>
  );
}

export default ClientHomeScreen;
