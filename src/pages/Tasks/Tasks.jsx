import React from "react";
import { Navbar } from "../../components";

export function Tasks() {
  return (
    <>
      <Navbar />
      <div className="main py-md min-h-100 ">
        <main className="max-width-1200 mx-auto">
          <div className="intro">
            <div className="greeting">Welcome back, Hamza!</div>
            <div className="message">You have 3 tasks today! <br /> Go get em!</div>
          </div>
          <div className="title-newtask">
            <h2>Tasks pending</h2>
            <button>Add</button>
          </div>
          <div className="task-list">
            <div className="task">
              <p>Task item</p>
              <div className="fas fa-edit"></div>
              <div className="fas fa-trash"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
