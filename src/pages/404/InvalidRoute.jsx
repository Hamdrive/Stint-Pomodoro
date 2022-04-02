import React from "react";
import Helmet from "react-helmet";
import InvalidRouteSplashscreen from "../../assets/404-Error.png";
import { useTheme } from "../../context/theme-context";
import styles from "./InvalidRoute.module.css";

export function InvalidRoute() {
  const { theme } = useTheme();

  return (
    <>
      <Helmet>
        <title>404 | Stint Pomodoro</title>
      </Helmet>
      <div
        className={` ${
          theme ? "background__dark text__dark" : "background__light"
        }  grid-container grid-1 theme-animation`}
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
