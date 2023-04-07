import React, { useState } from "react";
import styles from "@/styles/components/RegisterCard.module.css";
import GoogleChip from "./Google Material Design/GoogleChip";
import GoogleButton from "./Google Material Design/GoogleButton";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function RegisterCard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChip, setSelectedChip] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

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
    const API_URL_REGISTER = `/api/v1/${selectedChip}/register`;
    const postData = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(API_URL_REGISTER, postData);
      console.log(response.data);
      localStorage.setItem("isSignedIn", true);
      localStorage.setItem("userType", selectedChip);
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
    <div>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.inputs}
          placeholder="Name"
          type={"text"}
          onChange={handleNameChange}
        />
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
      <div>
        <p>Already have an account?</p>
        <Link href="/frontend/screens/LoginScreen">
          <GoogleButton label="Login" />
        </Link>
      </div>
    </div>
  );
}

export default RegisterCard;
