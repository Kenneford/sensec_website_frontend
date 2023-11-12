import React, { useEffect, useState } from "react";
import "./timer.scss";
import styled from "styled-components";

const TimerWrapper = styled.div`
  margin-top: 30vh;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: #222;
  color: #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.4);
  padding: 1rem 0;

  .stop-watch {
    font-size: 6rem;
    margin-right: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  input {
    width: 100px;
    margin-right: 1rem;
    color: #282c34;
    outline: none;
    border: none;
    font-size: 4.5rem;
    font-weight: 600;
    text-align: center;
    padding: 0rem 0.5rem;
    border-radius: 5px;
  }
  input:hover {
    background-color: #928f8f;
  }
`;
export default function Timer() {
  const [hours, setHours] = useState(window.localStorage.getItem("hour"));
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(null);

  // Start Pause & Stop functions
  // Start
  function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      //   setShowEndScreen({ ...showEndScreen, show: false });
    } else {
      window.alert("Add Time.");
    }
  }

  // Pause
  function pauseTimer() {
    setIsRunning(false);
  }
  // Stop

  function stopTimer() {
    resetTimer();
    // setShowEndScreen({ ...showEndScreen, show: false });
  }

  function resetTimer() {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  const time1 = "23:32:00";
  const time2 = "23:35:00";
  const cTime = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(cTime);
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState("");
  const updateTime = () => {
    const cTime = new Date().toLocaleTimeString();
    setCurrentTime(cTime);
  };
  setInterval(updateTime, 1000);

  //   useEffect(() => {
  //     if (time1 < currentTime && time2 > currentTime) {
  //       setHours(1);
  //       window.localStorage.setItem("hour", hours);
  //       //   startTimer();
  //     }
  //   }, [currentTime, hours]);
  //   useEffect(() => {
  //     if (time1 < currentTime && time2 > currentTime) {
  //       startTimer();
  //       setIsRunning(true);
  //       //   startTimer();
  //     }
  //   }, [currentTime, startTimer]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
          setMilliseconds(99);
        }
      }, 10);
    }

    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
      //   setShowEndScreen({ ...showEndScreen, show: true });
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, hours, isRunning]);

  // Handlers
  const changeSeconds = (e) => {
    setSeconds(e.target.value);
  };
  const changeMinutes = (e) => {
    setMinutes(e.target.value);
  };
  const changeHours = (e) => {
    setHours(e.target.value);
  };

  return (
    <TimerWrapper>
      <>
        <div className="d-flex flex-column">
          <label>hh</label>
          <input value={hours} onChange={changeHours} />
        </div>{" "}
        <div className="d-flex flex-column">
          <label>mm</label>
          <input value={minutes} onChange={changeMinutes} />
        </div>{" "}
        <div className="d-flex flex-column">
          <label>ss</label>
          <input value={seconds} onChange={changeSeconds} />
        </div>{" "}
        <div className="d-flex flex-column">
          <label>ms</label>
          <input value={milliseconds} />
        </div>
      </>
      <br />
      {!isRunning && (
        <button className="btn btn-accept btn-lg" onClick={() => startTimer()}>
          Play
        </button>
      )}
      {isRunning && (
        <button className="btn btn-warning btn-lg" onClick={pauseTimer}>
          Pause
        </button>
      )}
      <button className="btn btn-danger btn-lg" onClick={stopTimer}>
        Stop
      </button>
    </TimerWrapper>
  );
}
