import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Modal } from "../../components";
import { useTask } from "../../context/task-context";
import { useTheme } from "../../context/theme-context";
import { deleteTask } from "../utils.js";
import styles from "./Tasks.module.css";

export function Tasks() {
  // set modal initial states
  const [modal, setModal] = useState({ id: "", display: false });

  const { theme } = useTheme();
  const { tasks, handleTasks } = useTask();

  // delete task
  const handleTaskDelete = async (taskID) => {
    const newTasks = await deleteTask(tasks, taskID);
    handleTasks(newTasks);
  };

  // edit task
  const handleTaskEdit = (taskID) => {
    setModal((prev) => ({ ...prev, id: taskID, display: !prev.display }));
  };

  // changes modal state visiibility
  const toggleModal = () => {
    setModal((prev) => ({ ...prev, display: !prev.display }));
  };
  return (
    <main>
      <Helmet>
        <title>Tasks | Stint Pomodoro</title>
      </Helmet>
      <div
        className={` ${
          theme ? "background__dark text__dark" : "background__light"
        } container-height`}
      >
        <section className="max-width-1200 mx-auto px-md pos-rel">
          {modal.display && <Modal toggleModal={toggleModal} modal={modal} />}
          <div className="intro py-md">
            <h1 className="greeting txt-semibold">Welcome back, User!</h1>
            {tasks.length === 0 ? (
              <h2 className="message txt-regular">No tasks! Great work!</h2>
            ) : (
              <h2 className="message txt-regular">
                You have {tasks.length} task(s) today! Go get em!
              </h2>
            )}
          </div>
          <div
            className={`title-newtask ${styles.section} round-top-1 px-md tasks-height`}
          >
            <div className="flex-between py-md">
              <h2>Tasks To-Do</h2>
              <button
                onClick={toggleModal}
                className={`btn btn-sec btn-fab ${styles.add__task}`}
              >
                +
              </button>
            </div>
            <div className="task-list">
              {tasks &&
                tasks.map((task) => (
                  <div key={task.id} className={`${styles.task} my-1 dis-flex`}>
                    <Link
                      to="/pomodoro"
                      state={{ pomodoroTask: task }}
                      className="flex-grow-1"
                    >
                      <p className={` ${styles.task__title} w-100 txt-md `}>
                        {task.title}
                      </p>
                    </Link>
                    <div className={`${styles.task__controls}`}>
                      <div
                        onClick={() => handleTaskEdit(task.id)}
                        className={`fas fa-edit fa-2x pointer ${styles.task__icon} `}
                      ></div>
                      <div
                        onClick={() => handleTaskDelete(task.id)}
                        className={`fas fa-trash fa-2x pointer ${styles.task__icon} `}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
