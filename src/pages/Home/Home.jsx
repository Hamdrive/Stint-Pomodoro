import React from "react";
import Hero from "../../assets/hero-image.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/theme-context";
import Helmet from "react-helmet";

export function Home() {
  const { theme } = useTheme();

  return (
    <>
    <Helmet>
      <title>Home | Driver's Pomodoro</title>
    </Helmet>
      <div
        className={` ${
          theme ? "background__dark text__dark" : "background__light"
        } py-md`}
      >
        <main className="max-width-1200 grid grid-cols-2 gap-2 grid-ver-center min-vh-85 mx-auto px-lg main__home">
          <div className="content ml-4">
            <h1 className="txt-xl txt-semibold my-1">
              Stay focused, <br /> track your deltas, <br /> accomplish tasks.
            </h1>
            <p className="h4 my-2">
              <u className="txt-bold">Stint</u> is an easy-to-use{" "}
              <mark className="marker">task management</mark> and{" "}
              <mark className="marker">pomodoro timer</mark> that will help
              ensure you meet those <mark className="marker">deltas</mark>{" "}
              everytime!
            </p>
            <Link to="/tasks" className="btn btn-def btn-lg">
              checkout tasks
            </Link>
          </div>
          <div className="hero">
            <img className="mx-auto" src={Hero} alt="hero" />
          </div>
        </main>
      </div>
    </>
  );
}
