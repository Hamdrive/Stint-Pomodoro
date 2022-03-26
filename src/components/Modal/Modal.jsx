import React from "react";
import styles from "./Modal.module.css";

export function Modal({ toggleModal }) {
  return (
    <div className={`pos-rel`}>
      <div onClick={toggleModal} className={`${styles.overlay}`}></div>
      <section className={`${styles.modal} ${styles.modal__container}`}>
        <h2>Task</h2>
        <form class="form" novalidate>
          <div class="input-section">
            <label for="input" class="form-input input-required">
              Task name
            </label>
            <input
              type="text"
              className="input-corner input-md border-2"
              name="input"
              id="input"
              placeholder="Add Title"
              required
            />
          </div>
          <div className="input-section input-textarea">
            <label for="textarea" className="form-input">
              Task Description
            </label>
            <textarea
              name="textarea"
              class="input-corner input-md border-2"
              id="textarea"
              placeholder="Add Description"
            ></textarea>
          </div>
          <footer className={`${styles.modal__footer}`}>
            <button
              onClick={toggleModal}
              className={`btn btn-md mx-sm ${styles.outline}`}
            >
              Action 1
            </button>
            <button
              onClick={toggleModal}
              className={`btn btn-md mx-sm ${styles.ghost}`}
            >
              Action 2
            </button>
          </footer>
        </form>
        <div
          onClick={toggleModal}
          className={`fas fa-times ${styles.close} pointer`}
        ></div>
      </section>
    </div>
  );
}
