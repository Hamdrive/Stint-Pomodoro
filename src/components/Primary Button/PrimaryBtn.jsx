import React from 'react'
import styles from "./PrimaryBtn.module.css"

export function PrimaryBtn({disabled = false, id, callbackFn, children}) {
  return (
    <button
      onClick={callbackFn}
      id={id}
      disabled={disabled}
      className={`btn btn-md mx-sm ${styles.ghost}`}
    >
      {children}
    </button>
  );
}
