import React from "react";
import { Navbar } from "../../components";
import Hero from "../../assets/hero-image.png"
import styles from "./Home.module.css"

export function Home() {
  return (
    <>
      <Navbar />
      <div className={`${styles.main} py-md`}>
        <main className="max-width-1200 main grid grid-cols-2 gap-2 grid-ver-center min-vh-85 mx-auto px-lg">
          <div className="content ml-4">
            <h1 className="txt-xl my-1">
              Stay focused, track your deltas, accomplish tasks.
            </h1>
            <p className="h4 my-1">
              Stint is an easy-to-use <mark className="marker">task management</mark> and{" "}
              <mark className="marker">pomodoro timer</mark> that will help ensure you meet those{" "}
              <mark className="marker">deltas</mark> everytime!
            </p>
              <button className="btn btn-def btn-lg">
                checkout Tasks
              </button>
          </div>
          <div className="hero">
            <img className="mx-auto" src={Hero} alt="hero" />
          </div>
        </main>
      </div>
    </>
  );
}
