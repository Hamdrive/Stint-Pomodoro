import React from "react";
import { Navbar, PrimaryGhostBtn, SecondaryBtn } from "../../components";
import styles from "./Pomodoro.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


export function Pomodoro() {
  return (
    <>
      <Navbar />
      <div
        className={` ${styles.pomodoro__section} grid-container grid-2 gap-2 container-height round-top-1 max-width-1200 px-md mx-auto`}
      >
        <section>
          <div className={`${styles.pomodoro__task} round-top-1 px-md `}>
            <div className="py-md">
              <CountdownCircleTimer
                isPlaying
                duration={0}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                size={360}
              >
                {10 }
              </CountdownCircleTimer>
            </div>
            <div className="grid-container grid-2 gap-1">
              <PrimaryGhostBtn id={"start-btn"} btnStyles={"solid-primary"}>
                <i class="fas fa-play"></i>
                Start
              </PrimaryGhostBtn>
              <PrimaryGhostBtn id={"pause-btn"} btnStyles={"outline-primary"}>
                <i class="fas fa-pause"></i>
                Pause
              </PrimaryGhostBtn>
              <SecondaryBtn btnStyles={"span-2"}>
                <i class="fas fa-redo"></i>
                Restart
              </SecondaryBtn>
            </div>
          </div>
        </section>
        <section>
          <div className={`${styles.pomodoro__task} round-top-1 px-md`}>
            <div className="txt-lg txt-bold">Lorem ipsum</div>
            <div className="my-2 txt-md">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
              unde quibusdam harum rem perferendis. Fugit ut voluptatibus
              veritatis quos sapiente corporis aspernatur deserunt veniam iste
              pariatur sequi numquam, ex ad vitae eaque debitis dicta omnis
              nulla molestias reprehenderit! Voluptates ratione tempore minus
              inventore pariatur earum assumenda sint eligendi quod dicta?
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
