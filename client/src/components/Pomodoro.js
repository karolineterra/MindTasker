import React, { useState, useEffect } from "react";
import "../styles/Pomodoro.css";

function Pomodoro() {
  const templateType = "pomodoro";

  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (isOnBreak) {
            if (breakMinutes === 0) {
              clearInterval(interval);
              setIsActive(false);
              setIsOnBreak(false);
              setWorkMinutes(25);
              setSeconds(0);
            } else {
              setBreakMinutes(breakMinutes - 1);
              setSeconds(59);
            }
          } else {
            if (workMinutes === 0) {
              clearInterval(interval);
              setIsActive(false);
              setIsOnBreak(true);
              setBreakMinutes(5);
              setSeconds(0);
            } else {
              setWorkMinutes(workMinutes - 1);
              setSeconds(59);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isOnBreak, workMinutes, breakMinutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsOnBreak(false);
    setWorkMinutes(25);
    setBreakMinutes(5);
    setSeconds(0);
  };

  const startBreak = () => {
    setIsActive(true);
    setIsOnBreak(true);
    setBreakMinutes(5);
    setSeconds(0);
  };
  return (
    <div className="pomodoroContainer">
      <h3>Pomodoro</h3>
      <div id="timer">
        <p>{`${String(isOnBreak ? breakMinutes : workMinutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`}</p>
      </div>
      <div className="buttonsPom">
        <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        {!isActive && !isOnBreak && <button onClick={startBreak}>Break</button>}
      </div>
    </div>
  );
}

Pomodoro.templateType = "pomodoro";
export default Pomodoro;
