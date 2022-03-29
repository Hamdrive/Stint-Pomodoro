import React from "react";
import styles from "./PrimaryGhostBtn.module.css";

export function PrimaryGhostBtn({
  disabled = false,
  id,
  onClick,
  children,
  btnStyles = "",
}) {
  return (
    <button
      onClick={onClick}
      id={id}
      disabled={disabled}
      className={`btn btn-md mx-sm ${styles.ghost} ${btnStyles}`}
    >
      {children}
    </button>
  );
}
