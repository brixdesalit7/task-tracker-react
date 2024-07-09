import React, { useState, useEffect } from "react";
import "./style/App.scss";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [response, setResponse] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [task, setTask] = useState([]);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api");

        if (!response.ok) {
          setServerResponse(response.status)
        }

        const data = await response.json();
        return data;
      } catch (err) {
        setServerResponse(err)
      }
    }

    fetchData()
      .then(data => setTask(data.res))
      .catch(err => setServerResponse(err));
  }, [response]);
  

  return (
    <>
      <div className="task-tracker">
        <h1 className="task-tracker__heading">Task Tracker</h1>
        <AddTask task={task} response={response} setResponse={setResponse} />
        <TaskList task={task} serverResponse={serverResponse} />
      </div>
    </>
  );
};

export default App;
