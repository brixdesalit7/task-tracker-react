import React, { useRef, useContext } from "react";
import { AppContext } from "../App";

const AddTask = () => {
  // get Context
  const {task, setResponse } = useContext(AppContext)
  const inputRef = useRef(null);

  // Add task
  function handleAddTask(e) {
    e.preventDefault();

    const formData = {
      taskname: inputRef.current.value.trim(),
    };

    if (!formData.taskname) {
      return setResponse("Please input task name");
    }

    const checkTaskName = task.find(value => value.taskname === formData.taskname);

    if(checkTaskName) {
      return setResponse("Task name already exists");
    }

    fetch("http://localhost:5000/api/add", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => setResponse(data.res))
      .catch(error => setResponse(error));
  }

  return (
    <div className="task-tracker__form">
      <form method="POST" onSubmit={handleAddTask}>
        <label className="task-tracker__form__label">
          <input
            className="task-tracker__form__input"
            type="text"
            placeholder="Add a new task..."
            ref={inputRef}
            name="taskname"
          />
          <button type="submit" className="task-tracker__form__add">
            Add
          </button>
        </label>
      </form>
    </div>
  );
};

export default AddTask;
