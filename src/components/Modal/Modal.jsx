import React, { useState } from "react";
import reactDom from "react-dom";
import styles from "./Modal.module.css";
import { v4 as uuidv4 } from "uuid";
import { PrimaryGhostBtn } from "../PrimaryGhostButton/PrimaryGhostBtn";
import { SecondaryBtn } from "../Secondary Button/SecondaryBtn";
import { useTasks } from "../../context/tasks-context";

export function Modal({
  id,
  title = "",
  desc = "",
  focusDuration = "60",
  breakDuration = "30",
  editMode,
  seteditMode,
  toggleModal,
}) {
  const [info, setInfo] = useState({
    id,
    title,
    desc,
    focusDuration,
    breakDuration,
  });
  const [count, setCount] = useState({
    titleCount: info.title.length,
    descCount: info.desc.length,
  });

  const { taskState, taskDispatch } = useTasks();

  // update information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    setCount((prev) => ({ ...prev, [`${name}Count`]: value.length }));
  };

  // update tasks with reducer
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      let updatedTasks = taskState.tasks.map((item) => {
        if (item.id === info.id) {
          return { ...info };
        }
        return item;
      });
      taskDispatch({ type: "UPDATE_TASK", payload: updatedTasks });
      seteditMode(false);
    } else {
      taskDispatch({ type: "ADD_TASK", payload: { ...info, id: uuidv4() } });
      toggleModal();
    }
  };

  return reactDom.createPortal(
    <div className={`text__light`}>
      <div
        onClick={() => (editMode ? seteditMode(false) : toggleModal())}
        className={`${styles.overlay}`}
      ></div>
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
            <SecondaryBtn
              onClick={() => (editMode ? seteditMode(false) : toggleModal())}
              id={"cancel"}
              btnStyles={"outline-primary word-break"}
            >
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
              btnStyles={"solid-primary word-break"}
            >
              {editMode ? "Update" : "Add"} Task
            </PrimaryGhostBtn>
          </footer>
        </form>
        <div
          onClick={() => (editMode ? seteditMode(false) : toggleModal())}
          id="cancel"
          className={`fas fa-times ${styles.close} pointer`}
        ></div>
      </section>
    </div>,
    document.getElementById("modal")
  );
}
