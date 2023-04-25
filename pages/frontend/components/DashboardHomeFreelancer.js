import React from "react";
import NavbarFreelancer from "./Dashboard/Freelancer/Navbar";
import AppBar from "./Dashboard/AppBar";

function DashboardHomeFreelancer() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: "transparent",
      }}
    >
      <NavbarFreelancer name="HOME" type="Freelancer" />
      <AppBar title="Home" />
    </div>
  );
}

export default DashboardHomeFreelancer;
