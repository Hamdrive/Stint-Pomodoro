import React, { useState } from "react";
import styles from "./Modal.module.css";
import { PrimaryGhostBtn } from "../PrimaryGhostButton/PrimaryGhostBtn";
import { SecondaryBtn } from "../Secondary Button/SecondaryBtn";
import { useTask } from "../../context/task-context";
import { getTaskInfo, updateTasks } from "../../pages/utils.js";
import axios from "axios";

export function Modal({ toggleModal, modal }) {
  const { tasks, handleTasks } = useTask();
  const [info, setInfo] = useState(
    getTaskInfo(tasks, modal)[0] || {
      title: "",
      desc: "",
      focusDuration: "60",
      breakDuration: "30",
    }
  );
  const [count, setCount] = useState({
    titleCount: info.title.length,
    descCount: info.desc.length,
  });

  // update information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    setCount((prev) => ({ ...prev, [`${name}Count`]: value.length }));
  };

  // update tasks on localstorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    const getupdatedTasks = updateTasks(tasks, info);
    const res = await axios.post(
      "https://62478c20229b222a3fcdfa2c.mockapi.io/api/v1/tasks",
      { getupdatedTasks }
    );
    console.log(res);

    if (res.status === 200 || res.status === 201) {
      handleTasks(getupdatedTasks);
      toggleModal();
    }
  };

  return (
    <div className={`text__light pos-rel`}>
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
            {count.titleCount >= 10 ? (
              <p className="count-success txt-reg">
                <i className="fas fa-check-circle fa-sm"></i> Good To Go
              </p>
            ) : (
              <p className="count-fail txt-reg">
                <i className="fas fa-times-circle fa-sm"></i> (
                {count.titleCount}
                /10)
              </p>
            )}
          </div>
          <div className="input-section input-textarea">
            <label htmlFor="textarea" className="form-input">
              Task Description
            </label>
            <textarea
              name="desc"
              rows={5}
              className="input-corner input-md border-2"
              id="textarea"
              value={info.desc || ""}
              placeholder="Add Description"
              onChange={(e) => handleChange(e)}
            ></textarea>
            {count.descCount >= 30 ? (
              <p className="count-success txt-reg">
                <i className="fas fa-check-circle fa-sm"></i> Good To Go
              </p>
            ) : (
              <p className="count-fail txt-reg">
                <i className="fas fa-times-circle fa-sm"></i> ({count.descCount}
                /30)
              </p>
            )}
          </div>
          <div className="input-section">
            <label
              htmlFor="focusDuration"
              className="form-input input-required"
            >
              Focus duration
            </label>

            <input
              type="range"
              min="15"
              max="90"
              step="15"
              name="focusDuration"
              id="focusDuration"
              value={info.focusDuration}
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
          <div className="input-section">
            <label
              htmlFor="breakDuration"
              className="form-input input-required"
            >
              Break duration
            </label>

            <input
              type="range"
              min="15"
              max="60"
              step="15"
              name="breakDuration"
              id="breakDuration"
              value={info.breakDuration}
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
            </datalist>
          </div>
          <footer className={`${styles.modal__footer}`}>
            <SecondaryBtn onClick={toggleModal} id={"cancel"}>
              Cancel
            </SecondaryBtn>
            <PrimaryGhostBtn
              disabled={
                !info.title ||
                !info.focusDuration ||
                !info.breakDuration ||
                count.titleCount < 10 ||
                count.descCount < 30
              }
              onClick={(e) => handleSubmit(e)}
              id={"add"}
            >
              {modal.id ? "Update" : "Add"}
            </PrimaryGhostBtn>
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
