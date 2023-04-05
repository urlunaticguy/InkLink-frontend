import React, { useState } from "react";
import styles from "@/styles/components/RegisterCard.module.css";
import GoogleChip from "./Google Material Design/GoogleChip";
import GoogleButton from "./Google Material Design/GoogleButton";
// import postCall from "../swr/postCall";
// import useSWR from "swr";
import axios from "axios";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RegisterCard() {
  // api call to register will happen here
  //   const { data, error } = useSWR('/api/profile-data', fetcher)
  //   const { data, error } = useSWR(
  //     "https://ink-link.vercel.app/api/v1/client/signup",
  //     fetcher
  //   );
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

  //   const postCall = async (url, data) => {
  //     const { data: response, error } = useSWR(url, {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (error) {
  //       console.error(error);
  //     }
  //     if (response) {
  //       console.log(response);
  //       console.log("HELLO SOUVIK");
  //     }
  //     return { response, error };
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_URL_CLIENT_REGISTER =
      "https://ink-link-frontend.vercel.app/api/v1/agency/register";
    const postData = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(API_URL_CLIENT_REGISTER, postData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log("HELLO SOUVIK");
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
            selected={selectedChip === "Agency"}
            onClick={() => handleChipClick("Agency")}
          />
          <GoogleChip
            label="Client"
            selected={selectedChip === "Client"}
            onClick={() => handleChipClick("Client")}
          />
          <GoogleChip
            label="Freelancer"
            selected={selectedChip === "Freelancer"}
            onClick={() => handleChipClick("Freelancer")}
          />
        </div>
        <GoogleButton type="submit" label="Submit" disabled={!selectedChip} />
      </form>
    </div>
  );
}

export default RegisterCard;
