import React, { useState, useEffect, createContext } from "react";
import "./style/App.scss";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Response from "./components/Response";

export const AppContext = createContext()

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
  }, [response, setResponse]);

  return (
    <>
      <AppContext.Provider value={{ task, response, setResponse}}>
        <div className="task-tracker">
          <h1 className="task-tracker__heading">Task Tracker</h1>
          <AddTask/>
          <Response/>
          <TaskList serverError={serverError} isLoading={isLoading}/>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
