import React, { useState, useRef, useEffect } from "react";

const AddTask = ({ task, setTask }) => {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(errorMessage) {
      const timeoutMessage = setTimeout(() => {
        setErrorMessage(null);
      }, 3000)

      return () => clearTimeout(timeoutMessage);
    }
  }, [errorMessage])

  function handleAddTask() {
    const newTitle = inputRef.current.value.trim();
    
    if (!newTitle) {
      setErrorMessage("Please input task name");
    } else {
      setTask([
        ...task,
        {
          id: task.length + 1,
          title: newTitle,
          status: "In Progress",
        },
      ]);
      inputRef.current.value = "";
    }
  }

  return (
    <div className="task-tracker__form">
      <label className="task-tracker__form__label">
        <input
          className="task-tracker__form__input"
          type="text"
          placeholder="Add a new task..."
          ref={inputRef}
        />
        <button className="task-tracker__form__add" onClick={handleAddTask}>Add</button>
        {errorMessage && <p className="task-tracker__form__error message">{errorMessage}</p>}
      </label>
    </div>
  );
};

export default AddTask;
