import React from "react";
import styles from "./PrimaryGhostBtn.module.css";

export function PrimaryGhostBtn({
  disabled = false,
  id,
  callbackFn,
  children,
  btnStyles = "",
}) {
  return (
    <button
      onClick={callbackFn}
      id={id}
      disabled={disabled}
      className={`btn btn-md mx-sm ${styles.ghost} ${btnStyles}`}
    >
      {children}
    </button>
  );
}
