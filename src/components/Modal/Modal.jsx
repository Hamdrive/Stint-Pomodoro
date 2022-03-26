import React, { useState } from "react";
import styles from "./Modal.module.css";
import { v4 as uuidv4 } from "uuid";

export function Modal({ toggleModal, setTasks }) {

    const [info, setInfo] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setTasks(prevTasks => [...prevTasks, {id: uuidv4(), ...info }] )
        toggleModal()
    }
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
              value={info.title || ""}
              placeholder="Add Title"
              onChange={(e) =>
                setInfo((prevInfo) => ({ ...prevInfo, title: e.target.value }))
              }
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
              value={info.desc || ""}
              placeholder="Add Description"
              onChange={(e) =>
                setInfo((prevInfo) => ({ ...prevInfo, desc: e.target.value }))
              }
            ></textarea>
          </div>
          <footer className={`${styles.modal__footer}`}>
            <button
              onClick={toggleModal}
              className={`btn btn-md mx-sm ${styles.outline}`}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              id="add"
              className={`btn btn-md mx-sm ${styles.ghost}`}
            >
              Add
            </button>
          </footer>
          <div
            onClick={toggleModal}
            id="cancel"
            className={`fas fa-times ${styles.close} pointer`}
          ></div>
        </form>
      </section>
    </div>
  );
}
