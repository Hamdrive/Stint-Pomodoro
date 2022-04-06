import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Modal } from "../../components";
import { useTasks } from "../../context/tasks-context";
import { useTheme } from "../../context/theme-context";
import { TaskCard } from "./TaskCard";
import styles from "./Tasks.module.css";

export function Tasks() {
  // set modal initial states
  const [showModal, setshowModal] = useState(false);

  const { theme } = useTheme();
  const { tasks } = useTasks();

  // changes modal state visiibility
  const toggleModal = () => {
    setshowModal((prev) => !prev);
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
          {showModal && <Modal toggleModal={toggleModal} />}
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
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} toggleModal={toggleModal} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
