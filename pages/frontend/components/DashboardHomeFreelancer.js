import React, {useEffect, useState} from "react";
import NavbarFreelancer from "./Dashboard/Freelancer/Navbar";
import AppBar from "./Dashboard/AppBar";
import styles from "@/styles/components/UserDashboard/DashboardViewJobs.module.css";
import GanttChart from "./GanttChart";
import axios from "axios";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DashboardHomeFreelancer() {
  const [tasks, setTasks] = useState(
    [
      {
        start: new Date(2023, 5, 9),
        end: new Date(2023, 5, 11),
        name: 'Idea',
        id: 'Task 0',
        type:'task',
        progress: 60,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      },
      {
          start: new Date(2023, 5, 19),
          end: new Date(2023, 5, 29),
          name: 'Workout',
          id: 'Task 1',
          type:'task',
          progress: 20,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
  ])
  const [freelancerID, setFreelancerID] = useState("")
  const [name, setName] = useState("")
  const [duration, setDuration] = useState(new Date(2023, 5, 2))
  const [schedule, setSchedule] = useState()
  //dependencies is optional

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    const tempFreelancerID = localStorage.getItem("Mongo_ID")
    if (tempFreelancerID !== null) {
      setFreelancerID(tempFreelancerID)
      handleGetSchedule()
    }
  }, [])

  const handleGetSchedule = async () => {
    const tempFreelancerID = localStorage.getItem("Mongo_ID")
    const API_URL_GET_SCHEDULE = `/api/v1/freelancer/${tempFreelancerID}/schedule`;
    try {
      const response = await axios.get(API_URL_GET_SCHEDULE);
      console.log(response.data);
      if (response.data.message === "Schedule retrieved successfully") {
        setSchedule(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (schedule) {
        console.log(schedule)
        let newArray = []
        for (let i = 0; i < schedule.length; i++) {
            let newData = {
                start: new Date(schedule[i].start),
                end: new Date(schedule[i].end),
                name: schedule[i].name,
                id: `Task ${i}`,
                type:'task',
                progress: 60,
                isDisabled: true,
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
            }
            newArray.push(newData)
        }
        setTasks(newArray)
    }
  }, [schedule])

  // API endpoint - /api/v1/freelancer/{id}/schedule
  const handleSchedulePost = async () => {
    // const { name, start, end, duration, dependencies } = req.body;
    const data = {
      name : name,
      start : selectedStartDate,
      end : selectedEndDate,
      duration : duration
    }
    const API_URL_POST_SCHEDULE = `/api/v1/freelancer/${freelancerID}/schedule`;
    try {
      const response = await axios.post(API_URL_POST_SCHEDULE, data);
      console.log(response.data);
      setSchedule()
      handleGetSchedule()
    } catch (error) {
      console.log(error);
    }
  }
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
      <div style={{ width: "100%" }}>
        <AppBar title="Home" />
        <div className={styles.example} style={{backgroundColor: "white", color: "black"}}>
          <h2>Create a new Schedule</h2>
          <div style={{ display: "flex", gap: 10}}>
            <label style={{width: 300}}>Select Start Date</label>
            <DatePicker selected={selectedStartDate} onChange={handleStartDateChange} />
            <label style={{width: 300}}>Select End Date</label>
            <DatePicker selected={selectedEndDate} onChange={handleEndDateChange} />
          </div>
          <label>Task Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ paddingLeft: 5, paddingRight: 5 }}/>
          <br />
          <button onClick={() => {
            handleSchedulePost()
          }}
            style={{ marginTop: 10, marginBottom: 10}}
          >
            Press me to create new schedule
          </button>
          <br />
          {/* <button onClick={() => {
            handleGetSchedule()
          }}>
            Press me to get schedule
          </button> */}
          <Gantt tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default DashboardHomeFreelancer;
