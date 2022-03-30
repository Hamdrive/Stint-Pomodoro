import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Navbar } from "../../components";
import styles from "./Tasks.module.css";

export function Tasks() {
  const [modal, setModal] = useState({ id: "", display: false });
  const [tasks, setTasks] = useState([]);

  const handleTaskDelete = (taskID) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID));
  };

  const handleTaskEdit = (taskID) => {
    setModal((prev) => ({ ...prev, id: taskID, display: !prev.display }));
  };

  const toggleModal = () => {
    setModal((prev) => ({ ...prev, display: !prev.display }));
  };

  return (
    <main>
      <Navbar />
      <div className="main container-height">
        <section className="max-width-1200 mx-auto px-md pos-rel">
          {modal.display && (
            <Modal
              toggleModal={toggleModal}
              tasks={tasks}
              setTasks={setTasks}
              modal={modal}
              setModal={setModal}
            />
          )}
          <div className="intro py-md">
            <h1 className="greeting txt-semibold">Welcome back, Hamza!</h1>
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
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.task} my-1 flex-between`}
                >
                  <Link
                    to="/pomodoro"
                    state={{ pomodoroTask: task }}
                    className="dis-flex"
                  >
                    <p className="txt-md flex-grow-1">{task.title}</p>
                  </Link>
                  <div className="px-sm">
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
