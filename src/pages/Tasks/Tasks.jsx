import React, { useState } from "react";
import { Loader, Modal } from "../../components";
import { useAuth } from "../../context/auth-context";
import { useTasks } from "../../context/tasks-context";
import { useTheme } from "../../context/theme-context";
import { usePageTitle } from "../../utils";
import { TaskCard } from "./TaskCard";
import styles from "./Tasks.module.css";

export function Tasks() {
  // set modal initial states
  const [showModal, setshowModal] = useState(false);

  const { theme } = useTheme();
  const { taskState, loading } = useTasks();
  const {
    authState: { userData },
  } = useAuth();

  usePageTitle("Tasks | Stint Pomodoro");

  // changes modal state visiibility
  const toggleModal = () => {
    setshowModal((prev) => !prev);
  };

  return (
    <main>
      <div
        className={` ${
          theme ? "background__dark text__dark" : "background__light"
        } container-height`}
      >
        {loading ? (
          <Loader />
        ) : (
          <section className="max-width-1200 mx-auto px-md">
            {showModal && <Modal toggleModal={toggleModal} />}
            <div className="intro py-md">
              <h1 className="greeting txt-semibold">
                Welcome back, {userData?.displayName}
              </h1>
              {taskState.tasks.length === 0 ? (
                <h2 className="message txt-regular">No tasks! Great work!</h2>
              ) : (
                <h2 className="message txt-regular">
                  You have {taskState.tasks.length} task(s) today! Go get em!
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
                {taskState.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    toggleModal={toggleModal}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
