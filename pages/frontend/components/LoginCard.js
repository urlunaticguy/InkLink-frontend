import React, { useState, useEffect } from "react";
import styles from "@/styles/components/LoginCard.module.css";
import GoogleButton from "./Google Material Design/GoogleButton";
import GoogleChip from "./Google Material Design/GoogleChip";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { sairaCondensed } from "../../../utils/fonts";
import Link from "next/link";

function LoginCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChip, setSelectedChip] = useState(null);

  const [emailBoxColor, setEmailBoxColor] = useState("primary");
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");

  const [passwordBoxColor, setPasswordBoxColor] = useState("primary");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");

  useEffect(() => {
    if (email == "") {
      setEmailHelper("");
      setEmailBoxColor("primary");
    } else {
      const isEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g.test(email);
      if (isEmail) {
        setEmailHelper("✅ All set.");
        setEmailBoxColor("success");
      } else {
        setEmailHelper("Please enter a valid email.");
        setEmailBoxColor("warning");
      }
    }
  }, [email]);

  useEffect(() => {
    if (password == "") {
      setPasswordHelper("");
      setPasswordBoxColor("primary");
    } else {
      const isPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z]).{8,}$/g.test(
          password
        );
      if (isPassword) {
        setPasswordHelper("✅ All set.");
        setPasswordBoxColor("success");
      } else {
        setPasswordHelper(
          "Please enter a valid password - One each of 0-9, a-z, A-Z and special char."
        );
        setPasswordBoxColor("warning");
      }
    }
  }, [password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChipClick = (chip) => {
    setSelectedChip(chip === selectedChip ? null : chip);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSelectedChip(null);
    setIsLoading(true);
    const API_URL_LOGIN = `/api/v1/${selectedChip}/login`;
    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(API_URL_LOGIN, loginData);
      console.log(response.data);
      const receivedData = response.data.data;
      localStorage.setItem("isSignedIn", true);
      localStorage.setItem("userType", selectedChip);
      localStorage.setItem("Mongo_ID", receivedData.id);
      setTimeout(() => {
        setIsLoading(false);
        if (response.data.message == "success") {
          if (selectedChip == "agency") {
            router.push("/frontend/screens/AgencyHomeScreen");
          } else if (selectedChip == "user") {
            router.push("/frontend/screens/ClientHomeScreen");
          } else {
            router.push("/frontend/screens/FreelancerHomeScreen");
          }
        }
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.body}>
      <h1
        className={[styles.inkLinkHeading, sairaCondensed.className].join(" ")}
      >
        Ink-Link
      </h1>
      <h1 className={[styles.heading, sairaCondensed.className].join(" ")}>
        Login
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          error={emailError}
          helperText={emailHelper}
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
          color={emailBoxColor}
          type={"email"}
          onChange={handleEmailChange}
        />
        <TextField
          error={passwordError}
          helperText={passwordHelper}
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
          color={passwordBoxColor}
          type={"password"}
          onChange={handlePasswordChange}
        />
        <div>
          <GoogleChip
            label="Agency"
            selected={selectedChip === "agency"}
            onClick={() => handleChipClick("agency")}
            selectedColor="primary"
          />
          <GoogleChip
            label="User"
            selected={selectedChip === "user"}
            onClick={() => handleChipClick("user")}
            selectedColor="secondary"
          />
          <GoogleChip
            label="Freelancer"
            selected={selectedChip === "freelancer"}
            onClick={() => handleChipClick("freelancer")}
            selectedColor="error"
          />
        </div>
        <GoogleButton type="submit" label="Submit" disabled={!selectedChip} />
        {isLoading && <div className={styles.loadingAnimation}></div>}
      </form>
      <div style={{ marginTop: "1rem" }}>
        <h1 className={[styles.loginText, sairaCondensed.className].join(" ")}>
          Dont have an account?
        </h1>
        <Link href="/frontend/screens/RegisterScreen">
          <GoogleButton bgColor="secondary" label="Signup" />
        </Link>
      </div>
    </div>
  );
}

export default LoginCard;
