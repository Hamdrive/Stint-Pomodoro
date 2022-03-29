import React, { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Navbar, PrimaryGhostBtn, SecondaryBtn } from "../../components";
import styles from "./Pomodoro.module.css";
import "react-circular-progressbar/dist/styles.css";
import { useLocation } from "react-router-dom";

export function Pomodoro() {
  const location = useLocation();
  const { pomodoroTask } = location.state;
  const { title, desc, focusDuration, breakDuration } = pomodoroTask;

  const [isPaused, setPaused] = useState(true);
  const [pomodoroMode, setpomodoroMode] = useState("focus");
  const [seconds, setSeconds] = useState(0);

  const percentageRef = useRef(100);
  const secondsRef = useRef(seconds);
  const pausedRef = useRef(isPaused);
  const pomodoroModeRef = useRef(pomodoroMode);

  const focusMinutes = Number(focusDuration);
  const breakMinutes = Number(breakDuration);

  const totalSeconds =
    (pomodoroMode === "focus" ? focusMinutes : breakMinutes) * 60;
  console.log(totalSeconds);
  percentageRef.current = (seconds / totalSeconds) * 100;
  console.log(percentageRef);

  let minutesLeft = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
  if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  const handleSecondsUpdate = () => {
    secondsRef.current--;
    setSeconds(secondsRef.current);
  };

  const switchPomodoroMode = () => {
    const newMode = pomodoroModeRef.current === "focus" ? "break" : "focus";
    const newSeconds = (newMode === "focus" ? focusMinutes : breakMinutes) * 60;

    setpomodoroMode(newMode);
    pomodoroModeRef.current = newMode;

    setSeconds(newSeconds);
    secondsRef.current = newSeconds;
  };

  useEffect(() => {
    setSeconds(focusMinutes * 60);
    secondsRef.current = focusMinutes * 60;

    const interval = setInterval(() => {
      console.log("run", secondsRef.current);
      if (pausedRef.current) {
        console.log("pause");
        return;
      }
      if (secondsRef.current === 0) return switchPomodoroMode();

      handleSecondsUpdate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <section className="main">
        <div
          className={` ${styles.pomodoro__section} grid-container grid-2 gap-2 container-height round-top-1 max-width-1200 px-md mx-auto`}
        >
          <section>
            <div className={`${styles.pomodoro__task} round-top-1 px-md `}>
              <div className={` ${styles.pomodoro__timer}  mx-auto w-70 h-70`}>
                <CircularProgressbar
                  counterClockwise={true}
                  value={percentageRef.current}
                  text={`${minutesLeft} : ${secondsLeft}`}
                  styles={buildStyles({
                    textSize: "20px",
                    trailColor: "#fff",
                    pathColor:
                      pomodoroMode.current === "focus"
                        ? `hsl(16, 79%, 66%)`
                        : `hsl(196, 79%, 66%)`,
                    textColor:
                      pomodoroMode.current === "focus"
                        ? `hsl(16, 79%, 66%)`
                        : `hsl(196, 79%, 66%)`,
                  })}
                />
              </div>
              <div className="grid-container grid-2 gap-1">
                <PrimaryGhostBtn
                  onClick={() => (pausedRef.current = false)}
                  id={"start-btn"}
                  btnStyles={"solid-primary"}
                >
                  <i className="fas fa-play"></i>
                  Start
                </PrimaryGhostBtn>
                <PrimaryGhostBtn
                  onClick={() => (pausedRef.current = true)}
                  id={"pause-btn"}
                  btnStyles={"outline-primary"}
                >
                  <i className="fas fa-pause"></i>
                  Pause
                </PrimaryGhostBtn>
                <SecondaryBtn
                  onClick={() => {
                    pausedRef.current = true;
                    secondsRef.current = focusMinutes * 60;
                    setSeconds(focusMinutes * 60);
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
              <div className="txt-lg txt-bold">{title}</div>
              <div className="my-2 txt-md">{desc}</div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
