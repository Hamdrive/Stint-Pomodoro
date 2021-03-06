import React from "react";
import styles from "./SecondaryBtn.module.css";

export function SecondaryBtn({
  disabled = false,
  id,
  onClick,
  children,
  type= "button",
  btnStyles = "",
}) {
  return (
    <button
    type={type}
      onClick={onClick}
      id={id}
      disabled={disabled}
      className={`btn btn-md mx-sm ${styles.outline} ${btnStyles}`}
    >
      {children}
    </button>
  );
}
