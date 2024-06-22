import React from 'react'

const TaskList = () => {
    return (
        <table className="task-tracker__table">
            <thead className="task-tracker__table__thead">
                <tr className="task-tracker__table__thead__tr">
                    <th className="task-tracker__table__thead__tr__th">ID</th>
                    <th className="task-tracker__table__thead__tr__th">Task Name</th>
                    <th className="task-tracker__table__thead__tr__th">Task Status</th>
                    <th className="task-tracker__table__thead__tr__th">Option</th>
                </tr>
            </thead>
            <tbody className="task-tracker__table__tbody">
                <tr className="task-tracker__table__tbody__tr">
                    <th className="task-tracker__table__tbody__tr__th task-id">ID</th>
                    <th className="task-tracker__table__tbody__tr__th task-name">Task Name Task NameTask NameTask NameTask NameTask NameTask NameTask Name</th>
                    <th className="task-tracker__table__tbody__tr__th">Task Status</th>
                    <th className="task-tracker__table__tbody__tr__th">
                        <button className="task-tracker__table__tbody__tr__th__btn btn-edit">Edit</button>
                        <button className="task-tracker__table__tbody__tr__th__btn btn-delete">Delete</button>
                    </th>
                </tr>
                <tr className="task-tracker__table__tbody__tr">
                    <th className="task-tracker__table__tbody__tr__th task-id">ID</th>
                    <th className="task-tracker__table__tbody__tr__th task-name">Task Name Task NameTask NameTask NameTask NameTask NameTask NameTask Name</th>
                    <th className="task-tracker__table__tbody__tr__th">Task Status</th>
                    <th className="task-tracker__table__tbody__tr__th">
                        <button className="task-tracker__table__tbody__tr__th__btn btn-edit">Edit</button>
                        <button className="task-tracker__table__tbody__tr__th__btn btn-delete">Delete</button>
                    </th>
                </tr>
                <tr className="task-tracker__table__tbody__tr">
                    <th className="task-tracker__table__tbody__tr__th task-id">ID</th>
                    <th className="task-tracker__table__tbody__tr__th task-name">Task Name Task NameTask NameTask NameTask NameTask NameTask NameTask Name</th>
                    <th className="task-tracker__table__tbody__tr__th">Task Status</th>
                    <th className="task-tracker__table__tbody__tr__th">
                        <button className="task-tracker__table__tbody__tr__th__btn btn-edit">Edit</button>
                        <button className="task-tracker__table__tbody__tr__th__btn btn-delete">Delete</button>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default TaskList