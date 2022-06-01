import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { theme, updateTheme } = useTheme();

  const {
    authState: { isLoggedIn },
    signOutUser,
  } = useAuth();

  return (
    <div
      className={`${
        theme ? styles.header__dark : styles.header__light
      } header pos-st top-left-pos py-md`}
    >
      <header className="max-width-1200 nav-main flex-row flex-between px-md mx-auto">
        <Link to="/">
          <div
            className={`${
              theme ? styles.nav__logo__dark : styles.nav__logo__light
            } nav-logo`}
          >
            <div
              className={`fas fa-flag-checkered fa-1x ${styles.flag__rotate}`}
            ></div>
            Stint
          </div>
        </Link>

        <nav className="">
          <ul className={`${styles.nav__menu} dis-flex align-center h-100`}>
            <li className={`${styles.nav__item} nav-item`}>
              {isLoggedIn ? (
                <div onClick={() => signOutUser()} className="badge">
                  <div
                    className={`fas fa-sign-out-alt ${
                      theme
                        ? styles.badge__icon__dark
                        : styles.badge__icon__light
                    } pointer txt-lg px-sm`}
                  ></div>
                </div>
              ) : (
                <Link to="/login">
                  <div className="badge">
                    <div
                      className={`fas fa-sign-in-alt ${
                        theme
                          ? styles.badge__icon__dark
                          : styles.badge__icon__light
                      } pointer txt-lg px-sm`}
                    ></div>
                  </div>
                </Link>
              )}
            </li>
            <li className={`${styles.nav__item} nav-item`}>
              <a href="https://github.com/Hamdrive/drivers-pomodoro">
                <div
                  className={`fab fa-github ${
                    theme ? styles.badge__icon__dark : styles.badge__icon__light
                  } pointer txt-lg px-sm`}
                ></div>
              </a>
            </li>
            <li className={`${styles.nav__item} nav-item`}>
              <div onClick={() => updateTheme()} className="badge">
                {theme ? (
                  <div
                    className={`fas fa-sun ${styles.badge__icon__dark} pointer txt-lg px-sm`}
                  ></div>
                ) : (
                  <div
                    className={`fas fa-moon ${styles.badge__icon__light} pointer txt-lg px-sm`}
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
