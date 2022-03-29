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

  const [isPaused, setPaused] = useState(false);
  const [pomodoroMode, setpomodoroMode] = useState("focus");
  const [seconds, setSeconds] = useState(0);
  const [focusMinutes, setfocusMinutes] = useState(Number(focusDuration));
  const [breakMinutes, setbreakMinutes] = useState(Number(breakDuration));

  const percentageRef = useRef(100);
  const secondsRef = useRef(seconds);
  const pausedRef = useRef(isPaused);
  const pomodoroModeRef = useRef(pomodoroMode);

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

    const interval = setInterval(() => {
      if (pausedRef) return;
      if (secondsRef === 0) return switchPomodoroMode();

      handleSecondsUpdate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {}, []);

  const totalSeconds =
    (pomodoroMode === "focus" ? focusMinutes : breakMinutes) * 60;
  console.log(totalSeconds);
  percentageRef.current = Math.round((seconds / totalSeconds) * 100);
  console.log(percentageRef);

  const minutesLeft = Math.floor(seconds / 60);
  let secondsLeft = seconds % 60;
  if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

  return (
    <>
      <Navbar />
      <div
        className={` ${styles.pomodoro__section} grid-container grid-2 gap-2 container-height round-top-1 max-width-1200 px-md mx-auto`}
      >
        <section>
          <div className={`${styles.pomodoro__task} round-top-1 px-md `}>
            <div className="py-md mx-auto w-70 h-70">
              <CircularProgressbar
                counterClockwise={true}
                value={0.75}
                maxValue={1}
                text={`${minutesLeft} : ${secondsLeft}`}
                styles={buildStyles({
                  trailColor: "#fff",
                  pathColor:
                    pomodoroMode !== "focus"
                      ? `hsl(196, 79%, 66%)`
                      : `hsl(16, 79%, 66%)`,
                  textColor:
                    pomodoroMode !== "focus"
                      ? `hsl(196, 79%, 66%)`
                      : `hsl(16, 79%, 66%)`,
                })}
              />
            </div>
            <div className="grid-container grid-2 gap-1">
              <PrimaryGhostBtn id={"start-btn"} btnStyles={"solid-primary"}>
                <i className="fas fa-play"></i>
                Start
              </PrimaryGhostBtn>
              <PrimaryGhostBtn callbackFn={console.log("click")}  id={"pause-btn"} btnStyles={"outline-primary"}>
                <i className="fas fa-pause"></i>
                Pause
              </PrimaryGhostBtn>
              <SecondaryBtn btnStyles={"span-2"}>
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
    </>
  );
}
