import React from 'react'
import "./style/App.scss"
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <>
    <div className="task-tracker">
      <h1 className="task-tracker__heading">Task Tracker</h1>
      <AddTask/>
      <TaskList/>
    </div>
   </>
  )
}

export default App
