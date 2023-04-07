import React from "react";
import GoogleButton from "../../components/Google Material Design/GoogleButton";
import Link from "next/link";

function CreateJobCompletedScreen() {
  return (
    <>
      <div>Congratulations on creating a new job!!</div>
      <div>Go back Home Page</div>
      <Link href="/frontend/screens/ClientHomeScreen">
        <GoogleButton label="Go back to User Home" />
      </Link>
    </>
  );
}

export default CreateJobCompletedScreen;
