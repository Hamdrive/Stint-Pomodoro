import React from "react";
import { Navbar } from "../../components";
import styles from "./Tasks.module.css"

export function Tasks() {
  return (
    <main className="min-h-100 overflow-y">
      <Navbar />
      <div className="main py-md min-h-100">
        <section className="max-width-1200 mx-auto px-md">
          <div className="intro">
            <h1 className="greeting txt-semibold">Welcome back, Hamza!</h1>
            <h2 className="message txt-regular">
              You have 3 tasks today! Go get em!
            </h2>
          </div>
          <div className="title-newtask section round-top-1 px-md">
            <div className="flex-between py-md">
              <h2>Tasks To-Do</h2>
              <button className="btn btn-sec btn-fab">+</button>
            </div>
            <div className="task-list min-h-100">
              <div className={`${styles.task} my-1`}>
                <p>Task item</p>
                <div className="fas fa-edit"></div>
                <div className="fas fa-trash"></div>
              </div>
              <div className={`${styles.task} my-1`}>
                <p>Task item</p>
                <div className="fas fa-edit"></div>
                <div className="fas fa-trash"></div>
              </div>
              <div className={`${styles.task} my-1`}>
                <p>Task item</p>
                <div className="fas fa-edit"></div>
                <div className="fas fa-trash"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
