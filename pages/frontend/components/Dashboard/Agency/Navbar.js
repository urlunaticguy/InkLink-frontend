import React, { useState, useEffect } from "react";
import { sairaCondensed } from "../../../../../utils/fonts";
import {
  Home,
  Bookmark,
  PostAdd,
  AccountBox,
  Logout,
  Work,
  Group,
} from "@mui/icons-material";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import styles from "@/styles/components/Dashboard/Navbar.module.css";
import { useRouter } from "next/router";

function NavbarAgency(props) {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [homeColor, setHomeColor] = useState("black");
  const [viewJobsColor, setViewJobsColor] = useState("black");
  const [postJobsColor, setPostJobsColor] = useState("black");

  const navigate = (url) => {
    router.push(url);
  };

  useEffect(() => {
    localStorage.setItem("toggle", toggle);
  }, [toggle]);

  useEffect(() => {
    if (localStorage.getItem("toggle") !== null) {
      setToggle(!localStorage.getItem("toggle"));
    }
    if (props.name === "POST_JOB") {
      setPostJobsColor("yellow");
      console.log("HEEE");
    }
    if (props.name === "HOME") {
      setHomeColor("blue");
    } else if (props.name === "VIEW_JOBS") {
      setViewJobsColor("red");
    } else if (props.name === "SEARCH_JOBS") {
      setPostJobsColor("red");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("Mongo_ID");
    localStorage.removeItem("onejob");
    localStorage.removeItem("userType");
    router.push("/");
  };
  return (
    <>
      {toggle ? (
        <div className={styles.rootTemp}>
          <div className={styles.headingContainer}>
            <h1
              className={[sairaCondensed.className, styles.headingTemp].join(
                " "
              )}
            >
              Ink-Link
            </h1>
            <div
              className={styles.abc}
              onClick={() => {
                setToggle(false);
              }}
            >
              {/* <ToggleOff color="error" fontSize="large" /> */}
            </div>
          </div>
          <h2 className={[styles.menuTemp, sairaCondensed.className].join(" ")}>
            MENU
          </h2>
          <List
            className={styles.list}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem
              onClick={() => {
                navigate("");
              }}
              sx={{ color: homeColor }}
              className={styles.xyz}
            >
              <Home
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate("");
              }}
              sx={{ color: postJobsColor }}
              className={styles.xyz}
              divider
            >
              <PostAdd
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
            <ListItem className={styles.xyz}>
              <Bookmark
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate("");
              }}
              sx={{ color: viewJobsColor }}
              className={styles.xyz}
            >
              <Work
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
          </List>
          <h2 className={[styles.menu, sairaCondensed.className].join(" ")}>
            User
          </h2>
          <List
            className={styles.list}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem className={styles.xyz}>
              <AccountBox
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                handleLogout();
              }}
              className={styles.xyz}
            >
              <Logout
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
          </List>
        </div>
      ) : (
        <div className={styles.root}>
          <div className={styles.headingContainer}>
            <h1
              className={[sairaCondensed.className, styles.heading].join(" ")}
            >
              Ink-Link
            </h1>
            <div
              className={styles.abc}
              onClick={() => {
                setToggle(true);
              }}
            >
              {/* <ToggleOn color="success" fontSize="large" /> */}
            </div>
          </div>
          <h2 className={[styles.menu, sairaCondensed.className].join(" ")}>
            MENU
          </h2>
          <List
            className={styles.list}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem
              onClick={() => {
                navigate("");
              }}
              sx={{ color: homeColor }}
              className={styles.xyz}
            >
              <Home style={{ marginRight: "10px" }} />
              <ListItemText primary="My Jobs" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate(
                  "/frontend/components/AgencyDashboards/DashboardSearchJobs"
                );
              }}
              sx={{ color: postJobsColor }}
              className={styles.xyz}
              divider
            >
              <Work style={{ marginRight: "10px" }} />
              <ListItemText primary="Search Jobs" />
            </ListItem>
            <ListItem className={styles.xyz} button>
              <Group style={{ marginRight: "10px" }} />
              <ListItemText primary="Search Freelancers" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate("");
              }}
              sx={{ color: viewJobsColor }}
              className={styles.xyz}
            >
              <Bookmark style={{ marginRight: "10px" }} />
              <ListItemText primary="Bookmarks" />
            </ListItem>
            <Divider />
          </List>
          <h2 className={[styles.menu, sairaCondensed.className].join(" ")}>
            Souvik Das - {props.type}
          </h2>
          <List
            className={styles.list}
            component="nav"
            aria-label="mailbox folders"
          >
            <ListItem className={styles.xyz}>
              <AccountBox style={{ marginRight: "10px" }} />
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                handleLogout();
              }}
              className={styles.xyz}
            >
              <Logout style={{ marginRight: "10px" }} />
              <ListItemText primary="Logout" />
            </ListItem>
            <Divider />
          </List>
        </div>
      )}
    </>
  );
}

export default NavbarAgency;
