import React from "react";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <div className={`${styles.header} header pos-st top-left-pos py-md`}>
      <header className="max-width-1200 nav-main flex-row px-md mx-auto">
        <div className={`${styles.nav__logo} nav-logo`}>
          <div className="fas fa-flag-checkered"></div>
          Stint
        </div>

        <button className="hamburger">
          <i className="fas fa-bars"></i>
        </button>
        <nav className="nav-list">
          <button className="nav-list-close-btn">
            <i className="fas fa-2x fa-times"></i>
          </button>
          <ul className={`${styles.nav__menu} dis-flex align-center h-100`}>
            <li className={`${styles.nav__item} nav-item`}>
              <button className="btn btn-md btn-sec px-md">
                <div className="fab fa-github px-sm"></div>Github
              </button>
            </li>
            {true ? (
              <li className={`${styles.nav__item} nav-item`}>
                <div className="badge">
                  <div
                    className={`fas fa-moon ${styles.badge__icon} txt-md px-sm`}
                  ></div>
                </div>
              </li>
            ) : (
              <li className={`${styles.nav__item} nav-item`}>
                <div className="badge">
                  <div
                    className={`fas fa-sun ${styles.badge__icon} txt-md px-sm`}
                  ></div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
