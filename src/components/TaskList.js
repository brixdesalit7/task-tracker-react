import React from 'react'
import { useState, useRef } from 'react'

const TaskList = ({ task, setTasks }) => {
    const [update, setUpdate] = useState({});
    const updateInput = useRef();

    function showUpdate(id) {
        setUpdate(prevVal => ({
            ...prevVal,
            [id]: !prevVal[id]
        }));
    }

    function deleteTask(taskID) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID))
    }

    function updateTask(taskID) {
        const updatedTitle = updateInput.current.value;
        const updatedStatus = document.querySelector(`select[data-id="${taskID}"]`).value;

        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskID
                ? { ...task, title: updatedTitle, status: updatedStatus }
                : task
        ));

        setUpdate(prevVal => ({
            ...prevVal,
            [taskID]: false
        }));
    }

    return (
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
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-edit" onClick={() => showUpdate(val.id)}>Edit</button>
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-delete" onClick={() => deleteTask(val.id)}>Delete</button>
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
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-save" onClick={() => updateTask(val.id)}>Save</button>
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-delete" onClick={() => showUpdate(val.id)}>Close</button>
                                </th>
                            </tr>
                        )
                    }
                })}

            </tbody>
        </table>
    )
}

export default TaskList