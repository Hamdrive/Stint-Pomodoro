import React, { useState } from "react";
import styles from "./Modal.module.css";
import { v4 as uuidv4 } from "uuid";

const getInfo = (tasks, modal) => tasks.filter((task) => task.id === modal.id);

export function Modal({ toggleModal, setTasks, tasks, modal, setModal }) {
  const [info, setInfo] = useState(getInfo(tasks, modal)[0] || {});

  const handleSubmit = (e) => {
    e.preventDefault();

    setModal((prevModal) => ({ ...prevModal, id: "" }));

    let isPresent = false;
    let updatedTasks = tasks.map((item) => {
      if (item.id === info.id) {
        isPresent = true;
        return { ...info };
      }
      return item;
    });

    if (!isPresent) {
      updatedTasks = [...tasks, { ...info, id: uuidv4() }];
    }

    setTasks(updatedTasks);
    toggleModal();
  };

  return (
    <div className={`pos-rel`}>
      <div onClick={toggleModal} className={`${styles.overlay}`}></div>
      <section className={`${styles.modal} ${styles.modal__container}`}>
        <h2>Task</h2>
        <form className="form" noValidate>
          <div className="input-section">
            <label htmlFor="input" className="form-input input-required">
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
            <label htmlFor="textarea" className="form-input">
              Task Description
            </label>
            <textarea
              name="textarea"
              className="input-corner input-md border-2"
              id="textarea"
              value={info.desc || ""}
              placeholder="Add Description"
              onChange={(e) =>
                setInfo((prevInfo) => ({ ...prevInfo, desc: e.target.value }))
              }
            ></textarea>
          </div>
          <div className="input-section">
            <label htmlFor="input" className="form-input input-required">
              Task duration
            </label>

            <input
              type="range"
              min="15"
              max="90"
              step="15"
              defaultValue={info.duration || "60"}
              list="tickmarks"
              className="slider"
              onChange={(e) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  duration: e.target.value,
                }))
              }
            />
            <datalist
              className="datalist flex-between txt-sm w-100"
              id="tickmarks"
            >
              <option className="txt-semibold" value="15" label="15m"></option>
              <option className="txt-semibold" value="30" label="30m"></option>
              <option className="txt-semibold" value="45" label="45m"></option>
              <option className="txt-semibold" value="60" label="60m"></option>
              <option className="txt-semibold" value="75" label="75m"></option>
              <option className="txt-semibold" value="90" label="90m"></option>
            </datalist>
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
              {modal.id ? "Update" : "Add"}
            </button>
          </footer>
        </form>
        <div
          onClick={toggleModal}
          id="cancel"
          className={`fas fa-times ${styles.close} pointer`}
        ></div>
      </section>
    </div>
  );
}
