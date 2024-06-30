import React, { useState, useRef, useEffect } from "react";


const TaskList = ({ task, setTask }) => {
    const [update, setUpdate] = useState({});
    const [updateMessage, setUpdateMessage] = useState();
    const updateInput = useRef();

    useEffect(() => {
        if (updateMessage) {
            const timeoutMessage = setTimeout(() => {
                setUpdateMessage(null);
            }, 3000);
            return () => clearTimeout(timeoutMessage);
        }
    }, [updateMessage]);

    function handleShowUpdate(currentID) {
        setUpdate(prevVal => ({
            ...prevVal,
            [currentID]: !prevVal[currentID]
        }));
    }

    function handleDeleteTask(taskID) {
        setTask(prevTasks => prevTasks.filter((task) => task.id !== taskID));
        setUpdateMessage("Task deleted!")
    }

    function handleUpdateTask(taskID) {
        const updatedTitle = updateInput.current.value;
        const updatedStatus = document.querySelector(`select[data-id="${taskID}"]`).value;

        setTask(prevTasks => prevTasks.map(task => task.id === taskID ? 
            { ...task, title: updatedTitle, status: updatedStatus } 
            : task
        ));

        setUpdateMessage("Task updated!");

        setUpdate(prevVal => ({
            ...prevVal,
            [taskID]: false
        }));
    }

    return (
        <>
        {updateMessage && <p className="task-tracker__table__update message">{updateMessage}</p>}
        <table className="task-tracker__table">
            <thead className="task-tracker__table__thead">
                <tr className="task-tracker__table__thead__tr">
                    <th className="task-tracker__table__thead__tr__th">ID</th>
                    <th className="task-tracker__table__thead__tr__th title">Task Name</th>
                    <th className="task-tracker__table__thead__tr__th">Task Status</th>
                    <th className="task-tracker__table__thead__tr__th">Option</th>
                </tr>
            </thead>
            <tbody className="task-tracker__table__tbody">
                {task.map((val) => {
                    if (!update[val.id]) {
                        return (
                            <tr className="task-tracker__table__tbody__tr" key={val.id}>
                                <th className="task-tracker__table__tbody__tr__th task-id">{val.id}</th>
                                <th className="task-tracker__table__tbody__tr__th task-name">{val.title}</th>
                                <th className="task-tracker__table__tbody__tr__th">{val.status}</th>
                                <th className="task-tracker__table__tbody__tr__th">
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-edit" onClick={() => handleShowUpdate(val.id)}>Edit</button>
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-delete" onClick={() => handleDeleteTask(val.id)}>Delete</button>
                                </th>
                            </tr>
                        )
                    } else {
                        return (
                            <tr className="task-tracker__table__tbody__tr" key={val.id}>
                                <th className="task-tracker__table__tbody__tr__th task-id">{val.id}</th>
                                <th className="task-tracker__table__tbody__tr__th task-name">
                                    <input type="text" className="task-tracker__table__tbody__tr__th__input-text" ref={updateInput} defaultValue={val.title} />
                                </th>
                                <th className="task-tracker__table__tbody__tr__th">
                                    <select className="task-tracker__table__tbody__tr__th__select" defaultValue={val.status} data-id={val.id}>
                                        <option value="Finished">Finished</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </th>
                                <th className="task-tracker__table__tbody__tr__th">
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-save" onClick={() => handleUpdateTask(val.id)}>Save</button>
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-delete" onClick={() => handleShowUpdate(val.id)}>Close</button>
                                </th>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
        </>
    )
}

export default TaskList