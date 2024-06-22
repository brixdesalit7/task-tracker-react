import React from 'react'
import "./style/App.scss"
import AddTask from './components/AddTask'

const App = () => {
  return (
    <>
    <div className="task-tracker">
      <h1 className="task-tracker__heading">Task Tracker</h1>
      <AddTask/>
    </div>
   </>
  )
}

export default App
