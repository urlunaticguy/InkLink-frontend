import React, { useState } from "react";
import styles from "@/styles/components/LoginCard.module.css";
import GoogleButton from "./Google Material Design/GoogleButton";
import GoogleChip from "./Google Material Design/GoogleChip";
import { useRouter } from "next/router";
import axios from "axios";

function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChip, setSelectedChip] = useState(null);

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
      localStorage.setItem("Mongo_ID", receivedData._id);
      if (response.data.message == "success") {
        if (selectedChip == "agency") {
          router.push("/frontend/screens/AgencyHomeScreen");
        } else if (selectedChip == "user") {
          router.push("/frontend/screens/ClientHomeScreen");
        } else {
          router.push("/frontend/screens/FreelancerHomeScreen");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.body}>
      <h1 className={styles.heading}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.inputs}
          placeholder="Email"
          type={"email"}
          onChange={handleEmailChange}
        />
        <input
          className={styles.inputs}
          placeholder="Password"
          type={"password"}
          onChange={handlePasswordChange}
        />
        <div>
          <GoogleChip
            label="Agency"
            selected={selectedChip === "agency"}
            onClick={() => handleChipClick("agency")}
          />
          <GoogleChip
            label="User"
            selected={selectedChip === "user"}
            onClick={() => handleChipClick("user")}
          />
          <GoogleChip
            label="Freelancer"
            selected={selectedChip === "freelancer"}
            onClick={() => handleChipClick("freelancer")}
          />
        </div>
        <GoogleButton type="submit" label="Submit" disabled={!selectedChip} />
      </form>
    </div>
  );
}

export default LoginCard;
