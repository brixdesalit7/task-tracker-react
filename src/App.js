import React, { useState } from 'react'
import "./style/App.scss"
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

const App = () => {
  function initialTask() {
    return [
      {
        id: 1,
        title: "Task 1",
        status: "Finished"
      },
      {
        id: 2,
        title: "Task 2",
        status: "In Progress"
      },
      {
        id: 3,
        title: "Task 3",
        status: "Finished"
      },
    ]
  }

  const [task, setTask] = useState(initialTask)
  return (
    <>
      <div className="task-tracker">
        <h1 className="task-tracker__heading">Task Tracker</h1>
        <AddTask task={task} setTask={setTask}/>
        <TaskList task={task} setTask={setTask}/>
      </div>
    </>
  )
}

export default App
