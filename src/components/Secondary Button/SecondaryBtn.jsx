import React from "react";
import styles from "./SecondaryBtn.module.css";

export function SecondaryBtn({
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
      className={`btn btn-md mx-sm ${styles.outline} ${btnStyles}`}
    >
      {children}
    </button>
  );
}
