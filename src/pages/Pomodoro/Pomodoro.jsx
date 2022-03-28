import React from 'react'
import { Navbar } from '../../components'
import styles from "./Pomodoro.module.css"

export function Pomodoro() {
  return (
    <>
      <Navbar />
      <div
        className={` ${styles.pomodoro__section} grid-container grid-2 gap-2 container-height round-top-1 max-width-1200 px-md mx-auto`}
      >
        <section></section>
        <section>
          <div className={`${styles.pomodoro__task} round-top-1 px-md`}>
            <div className='txt-lg txt-bold'>Lorem ipsum</div >
            <div className='my-2 txt-md'>
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
