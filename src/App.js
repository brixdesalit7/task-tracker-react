import React from 'react'
import "./style/App.scss"
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

const App = () => {
  const taskList = [
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
  return (
    <>
      <div className="task-tracker">
        <h1 className="task-tracker__heading">Task Tracker</h1>
        <AddTask />
        <TaskList task={taskList}/>
      </div>
    </>
  )
}

export default App
