import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../components";
import { useTasks } from "../../context/tasks-context";
import styles from "./Tasks.module.css";

export function TaskCard({ task }) {
  const [editMode, seteditMode] = useState(false);

  const { taskDispatch } = useTasks();
  const { id, title, desc, focusDuration, breakDuration } = task;

  const handleTaskEdit = () => {
    seteditMode((edit) => !edit);
  };

  const handleTaskDelete = (id) => {
    taskDispatch({ type: "DELETE_TASK", payload: { id: id } });
  };

  return (
    <div key={task.id} className={`${styles.task} my-1 dis-flex`}>
      {editMode && (
        <Modal
          id={id}
          title={title}
          desc={desc}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          editMode={editMode}
          seteditMode={seteditMode}
        />
      )}
      <Link
        to={`/pomodoro/{id}`}
        state={{ pomodoroTask: task }}
        className="flex-grow-1"
      >
        <p className={` ${styles.task__title} w-100 txt-md `}>{title}</p>
        <p className={` ${styles.task__title} w-100 txt-reg `}>
          Focus duration: {focusDuration} mins, Break duration: {breakDuration}{" "}
          mins
        </p>
      </Link>
      <div className={`${styles.task__controls}`}>
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
  );
}
