import React, { useState } from "react";
import { Modal, Navbar } from "../../components";
import styles from "./Tasks.module.css";

export function Tasks() {

    const [modal, setModal] = useState(false)

    const [tasks, setTasks] = useState([])

    const toggleModal = () => {
        setModal(prev => !prev)
    }

  return (
    <main className="">
      <Navbar />
      <div className="main min-vh-85">
        <section className="max-width-1200 mx-auto px-md pos-rel">
            {modal && <Modal toggleModal={toggleModal} setTasks={setTasks} />}
          <div className="intro py-md">
            <h1 className="greeting txt-semibold">Welcome back, Hamza!</h1>
            <h2 className="message txt-regular">
              You have 3 tasks today! Go get em!
            </h2>
          </div>
          <div className={`title-newtask ${styles.section} round-top-1 px-md`}>
            <div className="flex-between py-md">
              <h2>Tasks To-Do</h2>
              <button onClick={toggleModal} className={`btn btn-sec btn-fab ${styles.add__task}`}>
                +
              </button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
              <div className={`${styles.task} my-1 flex-between`}>
                <p className="txt-md">{task.title}</p>
                <div>
                  <div onClick={toggleModal}
                    className={`fas fa-edit fa-2x pointer ${styles.task__icon} `}
                  ></div>
                  <div onClick={toggleModal}
                    className={`fas fa-trash fa-2x  pointer ${styles.task__icon} `}
                  ></div>
                </div>
              </div>

                ))}
              {/* <div className={`${styles.task} my-1 flex-between`}>
                <p className="txt-md">Task item</p>
                <div>
                  <div
                    className={`fas fa-edit fa-2x ${styles.task__icon} `}
                  ></div>
                  <div
                    className={`fas fa-trash fa-2x ${styles.task__icon} `}
                  ></div>
                </div>
              </div>
              <div className={`${styles.task} my-1 flex-between`}>
                <p className="txt-md">Task item</p>
                <div>
                  <div
                    className={`fas fa-edit fa-2x ${styles.task__icon} `}
                  ></div>
                  <div
                    className={`fas fa-trash fa-2x ${styles.task__icon} `}
                  ></div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
