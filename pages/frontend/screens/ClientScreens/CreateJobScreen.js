import React from "react";
import ClientCreateJobCard from "../../components/ClientCreateJobCard";
import styles from "@/styles/screens/ClientScreens/CreateJobScreen.module.css";

function CreateJobScreen() {
  //   const { title, details, salary, frequency, location, type, tags } = req.body;
  //   const { id } = req.query;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_URL_CLIENT_REGISTER = `/api/v1/${selectedChip}/register`;
    const postData = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(API_URL_CLIENT_REGISTER, postData);
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
    <>
      <div className={styles.body}>This is Create Job Screen under Client</div>
      <ClientCreateJobCard />
    </>
  );
}

export default CreateJobScreen;
