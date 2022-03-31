import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme-context";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { theme, updateTheme } = useTheme();

  return (
    <div
      className={`${
        theme ? styles.header__dark : styles.header__light
      } header pos-st top-left-pos py-md`}
    >
      <header className="max-width-1200 nav-main flex-row px-md mx-auto">
        <Link to="/">
          <div
            className={`${
              theme ? styles.nav__logo__dark : styles.nav__logo__light
            } nav-logo`}
          >
            <div
              className={`fas fa-flag-checkered fa-1x ${styles.flag__rotate}`}
            ></div>{" "}
            Stint
          </div>
        </Link>

        <button className="hamburger">
          <i className="fas fa-bars"></i>
        </button>
        <nav className="nav-list">
          <button className="nav-list-close-btn">
            <i className="fas fa-2x fa-times"></i>
          </button>
          <ul className={`${styles.nav__menu} dis-flex align-center h-100`}>
            <li className={`${styles.nav__item} nav-item`}>
              <a
                href="https://github.com/Hamdrive/drivers-pomodoro"
                className="btn btn-md btn-sec px-md"
              >
                <div className="fab fa-github px-sm"></div>Github
              </a>
            </li>
              <li className={`${styles.nav__item} nav-item`}>
                <div onClick={() => updateTheme()} className="badge">
                  {theme ? (
                    <div
                      className={`fas fa-sun ${styles.badge__icon__dark} pointer txt-md px-sm`}
                    ></div>
                  ) : (
                    <div
                      className={`fas fa-moon ${styles.badge__icon__light} pointer txt-md px-sm`}
                    ></div>
                  )}
                </div>
              </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
