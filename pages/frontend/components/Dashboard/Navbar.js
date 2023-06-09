import React, { useState, useEffect } from "react";
import { sairaCondensed } from "../../../../utils/fonts";
import {
  ToggleOff,
  ToggleOn,
  Home,
  Bookmark,
  PostAdd,
  AccountBox,
  Logout,
  Work,
} from "@mui/icons-material";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import styles from "@/styles/components/Dashboard/Navbar.module.css";
import { useRouter } from "next/router";

function Navbar(props) {
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
    } else if (props.name === "POST_JOB") {
      setPostJobsColor("red");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
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
              <ToggleOff color="error" fontSize="large" />
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
                navigate("/frontend/screens/ClientHomeScreen");
              }}
              sx={{ color: homeColor }}
              className={styles.xyz}
              button
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
                navigate(
                  "/frontend/components/UserDashboards/DashboardPostJob"
                );
              }}
              sx={{ color: postJobsColor }}
              className={styles.xyz}
              button
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
            <ListItem className={styles.xyz} button>
              <Bookmark
                style={{
                  marginLeft: "-10px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
            </ListItem>
            <Divider light />
            <ListItem
              onClick={() => {
                navigate(
                  "/frontend/components/UserDashboards/DashboardViewJobs"
                );
              }}
              sx={{ color: viewJobsColor }}
              className={styles.xyz}
              button
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
            <ListItem className={styles.xyz} button>
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
              button
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
              <ToggleOn color="success" fontSize="large" />
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
                navigate("/frontend/screens/ClientHomeScreen");
              }}
              sx={{ color: homeColor }}
              className={styles.xyz}
            >
              <Home style={{ marginRight: "10px" }} />
              <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate(
                  "/frontend/components/UserDashboards/DashboardPostJob"
                );
              }}
              sx={{ color: postJobsColor }}
              className={styles.xyz}
              button
              divider
            >
              <PostAdd style={{ marginRight: "10px" }} />
              <ListItemText primary="Post Job" />
            </ListItem>
            <ListItem className={styles.xyz} button>
              <Bookmark style={{ marginRight: "10px" }} />
              <ListItemText primary="Bookmarks" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                navigate(
                  "/frontend/components/UserDashboards/DashboardViewJobs"
                );
              }}
              sx={{ color: viewJobsColor }}
              className={styles.xyz}
              button
            >
              <Work style={{ marginRight: "10px" }} />
              <ListItemText primary="Jobs" />
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
            <ListItem className={styles.xyz} button>
              <AccountBox style={{ marginRight: "10px" }} />
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem
              onClick={() => {
                handleLogout();
              }}
              className={styles.xyz}
              button
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

export default Navbar;
