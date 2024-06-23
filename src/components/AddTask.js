import React from 'react'
import { useRef } from 'react'

const AddTask = ({task, setTask}) => {
  const inputRef = useRef(null);

  function addTask() {
    const newTitle = inputRef.current.value.trim();
    if(newTitle !== "") {
      setTask([
        ...task,
        {
          id: task.length + 1,
          title: newTitle,
          status: "In Progress"
        }
      ]);
      inputRef.current.value = '';
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
            <button className="task-tracker__form__add" onClick={addTask}>Add</button>
        </label>
    </div>
  )
}

export default AddTask