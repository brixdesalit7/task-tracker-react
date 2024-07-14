import React, { useState, useEffect } from "react";
import "./style/App.scss";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [response, setResponse] = useState("");
  const [serverError, setServerError] = useState(null);
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setServerError(null);
      try {
        const response = await fetch("http://localhost:5000/api");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTask(data.res);
      } catch (err) {
        setServerError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [response]);


  return (
    <>
      <div className="task-tracker">
        <h1 className="task-tracker__heading">Task Tracker</h1>
        <AddTask task={task} response={response} setResponse={setResponse} />
        <TaskList 
          task={task} 
          serverError={serverError} 
          isLoading={isLoading} 
        />
      </div>
    </>
  );
};

export default App;
