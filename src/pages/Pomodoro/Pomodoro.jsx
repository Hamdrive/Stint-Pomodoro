import React, { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Navbar, PrimaryGhostBtn, SecondaryBtn } from "../../components";
import styles from "./Pomodoro.module.css";
import "react-circular-progressbar/dist/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

export function Pomodoro() {
  // get props passed with Link
  const location = useLocation();
  const navigate = useNavigate();
  const { pomodoroTask } = location.state;
  const { title, desc, focusDuration, breakDuration } = pomodoroTask;

  // set initial state
  const [pomodoroMode, setpomodoroMode] = useState("focus");
  const [seconds, setSeconds] = useState(0);

  //set refs using useRef hook
  const percentageRef = useRef(100);
  const secondsRef = useRef(seconds);
  const pomodoroModeRef = useRef(pomodoroMode);
  const intervalRef = useRef(null);

  // convert Link props to Number type
  const focusMinutes = Number(focusDuration);
  const breakMinutes = Number(breakDuration);

  // calculations for total time
  const totalSeconds =
    (pomodoroMode === "focus" ? focusMinutes : breakMinutes) * 60;
  percentageRef.current = (seconds / totalSeconds) * 100;
  let minutesLeft = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  // handle update seconds within setInterval
  const handleSecondsUpdate = () => {
    secondsRef.current--;
    setSeconds(secondsRef.current);
  };

  // switch modes withing setInterval
  const switchPomodoroMode = () => {
    const newMode = pomodoroModeRef.current === "focus" ? "break" : "focus";
    const newSeconds = (newMode === "focus" ? focusMinutes : breakMinutes) * 60;

    setpomodoroMode(newMode);
    pomodoroModeRef.current = newMode;

    setSeconds(newSeconds);
    secondsRef.current = newSeconds;
  };

  // handle pause/restart count
  const handleStopInterval = () => {
    clearInterval(intervalRef.current);
  };

  // handle start count
  const handleStartInterval = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (secondsRef.current === 0) return switchPomodoroMode();
      handleSecondsUpdate();
    }, 1000);
  };

  // initialize setInterval on render
  useEffect(() => {
    setSeconds(focusMinutes * 60);
    secondsRef.current = focusMinutes * 60;
  }, []);

  // update page title with time and mode
  useEffect(() => {
    document.title =
      pomodoroMode === "focus"
        ? `${minutesLeft} : ${secondsLeft} 👨‍💻 | Pomodoro`
        : `${minutesLeft} : ${secondsLeft} ☕ | Pomodoro`;
  }, [minutesLeft, secondsLeft, pomodoroMode]);

  return (
    <>
      <Navbar />
      <section className="main">
        <div
          className={` ${styles.pomodoro__section} grid-container grid-2 gap-2 container-height round-top-1 max-width-1200 px-md mx-auto`}
        >
          <section>
            <div className={`${styles.pomodoro__task} round-top-1 px-md `}>
              <SecondaryBtn onClick={() => navigate("/tasks")}>
                <i class="fas fa-arrow-left"></i>
                Return to Tasks
              </SecondaryBtn>
              <div className={` ${styles.pomodoro__timer}  mx-auto w-70 h-70`}>
                <CircularProgressbar
                  counterClockwise={true}
                  value={percentageRef.current}
                  text={`${minutesLeft} : ${secondsLeft}`}
                  styles={buildStyles({
                    textSize: "20px",
                    trailColor: "#fff",
                    pathColor:
                      pomodoroModeRef.current === "focus"
                        ? `hsl(196, 79%, 66%)`
                        : `hsl(16, 79%, 66%)`,
                    textColor:
                      pomodoroModeRef.current === "focus"
                        ? `hsl(196, 79%, 66%)`
                        : `hsl(16, 79%, 66%)`,
                  })}
                />
              </div>
              <div className="grid-container grid-2 gap-1">
                <PrimaryGhostBtn
                  onClick={() => handleStartInterval()}
                  id={"start-btn"}
                  btnStyles={"solid-primary"}
                >
                  <i className="fas fa-play"></i>
                  Start
                </PrimaryGhostBtn>
                <PrimaryGhostBtn
                  onClick={() => handleStopInterval()}
                  id={"pause-btn"}
                  btnStyles={"outline-primary"}
                >
                  <i className="fas fa-pause"></i>
                  Pause
                </PrimaryGhostBtn>
                <SecondaryBtn
                  onClick={() => {
                    handleStopInterval();
                    secondsRef.current = focusMinutes * 60;
                    setSeconds(focusMinutes * 60);
                    pomodoroModeRef.current = "focus";
                  }}
                  btnStyles={"span-2"}
                >
                  <i className="fas fa-redo"></i>
                  Restart
                </SecondaryBtn>
              </div>
            </div>
          </section>
          <section>
            <div className={`${styles.pomodoro__task} round-top-1 px-md`}>
              <div className="txt-lg txt-bold txt-center">{title}</div>
              <div className="my-2 txt-md">{desc}</div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
