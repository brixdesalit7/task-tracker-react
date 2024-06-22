import React from 'react'

const AddTask = () => {
  return (
    <div className="task-tracker__form">
        <label className="task-tracker__form__label">
            <input className="task-tracker__form__input" type="text" placeholder="Add a new task..." />
            <button className="task-tracker__form__add">Add</button>
        </label>
    </div>
  )
}

export default AddTask