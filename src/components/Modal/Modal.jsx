import React, { useState } from "react";
import styles from "./Modal.module.css";
import { v4 as uuidv4 } from "uuid";
import { PrimaryBtn } from "../Primary Button/PrimaryBtn";

const getInfo = (tasks, modal) => tasks.filter((task) => task.id === modal.id);

export function Modal({ toggleModal, setTasks, tasks, modal }) {
  const [info, setInfo] = useState(
    getInfo(tasks, modal)[0] || { title: "", desc: "", duration: "60" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);

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
              name="title"
              id="input"
              value={info.title || ""}
              placeholder="Add Title"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="input-section input-textarea">
            <label htmlFor="textarea" className="form-input">
              Task Description
            </label>
            <textarea
              name="desc"
              className="input-corner input-md border-2"
              id="textarea"
              value={info.desc || ""}
              placeholder="Add Description"
              onChange={(e) => handleChange(e)}
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
              name="duration"
              value={info.duration}
              list="tickmarks"
              className="slider"
              onChange={(e) => handleChange(e)}
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
            <PrimaryBtn
              disabled={!info.title || !info.duration}
              callbackFn={(e) => handleSubmit(e)}
              id={"add"}
            >
              {modal.id ? "Update" : "Add"}
            </PrimaryBtn>
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
