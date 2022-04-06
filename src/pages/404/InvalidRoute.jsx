import React from "react";
import InvalidRouteSplashscreen from "../../assets/404-Error.png";
import { useTheme } from "../../context/theme-context";
import { usePageTitle } from "../../utils";
import styles from "./InvalidRoute.module.css";

export function InvalidRoute() {
  const { theme } = useTheme();

  usePageTitle("404 Not Found | Stint Pomodoro");

  return (
    <>
      <div
        className={` ${
          theme ? "background__dark text__dark" : "background__light"
        }  grid-container grid-1`}
      >
        <img
          className={`${styles.splashscreen}`}
          src={InvalidRouteSplashscreen}
          alt={"404 error"}
        />
      </div>
    </>
  );
}
