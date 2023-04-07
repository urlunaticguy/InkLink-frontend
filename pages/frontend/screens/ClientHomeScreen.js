import React from "react";
import Link from "next/link";

function ClientHomeScreen() {
  return (
    <div>
      This is Client Home Screen.
      <div>This is Client Job Posting button</div>
      <div>Figma reference - Post a new Requirement</div>
      <Link href="/frontend/screens/ClientScreens/CreateJobScreen">
        POST A NEW REQUIREMENT
      </Link>
    </div>
  );
}

export default ClientHomeScreen;
