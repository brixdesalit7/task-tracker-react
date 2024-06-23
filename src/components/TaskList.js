import React from 'react'
import { useState } from 'react'

const TaskList = ({ task }) => {
    const [update, setUpdate] = useState({});
    
    function showUpdate(id) {
        setUpdate(prevVal => ({
            ...prevVal,
            [id] : !prevVal[id]
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
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-delete">Delete</button>
                                </th>
                            </tr>
                        )
                    } else {
                        return (
                            <tr className="task-tracker__table__tbody__tr" key={val.id}>
                                <th className="task-tracker__table__tbody__tr__th task-id">{val.id}</th>
                                <th className="task-tracker__table__tbody__tr__th task-name">
                                    <input type="text" className="task-tracker__table__tbody__tr__th__input-text" defaultValue={val.title} />
                                </th>
                                <th className="task-tracker__table__tbody__tr__th">
                                    <select className="task-tracker__table__tbody__tr__th__select" defaultValue={val.status}>
                                        <option value="finished">Finished</option>
                                        <option value="inprogress">In Progress</option>
                                    </select>
                                </th>
                                <th className="task-tracker__table__tbody__tr__th">
                                    <button className="task-tracker__table__tbody__tr__th__btn btn-save">Save</button>
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