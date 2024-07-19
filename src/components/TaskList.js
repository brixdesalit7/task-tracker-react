import React, { useState } from "react";

const TaskList = ({ task, serverError, isLoading, setResponse }) => {
    // For updating task
    const [selectedTask, setSelectedTask] = useState({});
    // For showing update modal
    const [modal, setShowModal] = useState(false);

    // Show Modal Update Task
    function handleModal(postID) {
        if (!modal) {
            const filterTask = task.filter((task) => task.id === postID);
            setSelectedTask({
                id: filterTask[0].id,
                taskname: filterTask[0].taskname,
                status: filterTask[0].status,
            });
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }

    // Handle Update
    function handleInputChange(e) {
        setSelectedTask({
            ...selectedTask,
            [e.target.name]: e.target.value,
        });
    }
    
    function handleUpdate(e) {
        e.preventDefault();

        const postID = selectedTask.id;

        const formData = {
            taskname: selectedTask.taskname,
            status: selectedTask.status,
        };

        fetch(`http://localhost:5000/api/update/${postID}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setResponse(data.res))
            .catch((err) => setResponse(err));

        setShowModal(false);
    }

    // Delete Task
    function handleDeleteTask(taskID) {
        fetch(`http://localhost:5000/api/delete/${taskID}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => setResponse(data.res))
            .catch((error) => setResponse(error));
    }

    if (isLoading) {
        return <h1 className="task-tracker__errormessage">Loading...</h1>;
    } else if (serverError) {
        return (
            <h1 className="task-tracker__errormessage">
                Server error: {serverError}
            </h1>
        );
    } else if (task.length === 0) {
        return <h1 className="task-tracker__errormessage">There are no tasks</h1>;
    } else {
        return (
            <>
                <table className="task-tracker__table">
                    <thead className="task-tracker__table__thead">
                        <tr className="task-tracker__table__thead__tr">
                            <th className="task-tracker__table__thead__tr__th title">
                                Task Name
                            </th>
                            <th className="task-tracker__table__thead__tr__th">
                                Task Status
                            </th>
                            <th className="task-tracker__table__thead__tr__th">Option</th>
                        </tr>
                    </thead>
                    <tbody className="task-tracker__table__tbody">
                        {task &&
                            task.map((val) => {
                                return (
                                    <tr className="task-tracker__table__tbody__tr" key={val.id}>
                                        <th className="task-tracker__table__tbody__tr__th task-name">
                                            {val.taskname}
                                        </th>
                                        <th className="task-tracker__table__tbody__tr__th">
                                            {val.status === 1 ? "Task Finished" : "Task Pending"}
                                        </th>
                                        <th className="task-tracker__table__tbody__tr__th">
                                            <button
                                                className="task-tracker__table__tbody__tr__th__btn btn btn-edit"
                                                onClick={() => handleModal(val.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="task-tracker__table__tbody__tr__th__btn btn btn-delete"
                                                onClick={() => handleDeleteTask(val.id)}
                                            >
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div
                    className={
                        modal ? "task-tracker__modal is-opened" : "task-tracker__modal"
                    }
                >
                    <div className="task-tracker__modal__bg" onClick={handleModal}></div>
                    <div className="task-tracker__modal__inner">
                        <p className="task-tracker__modal__title">Update Task</p>
                        <form className="task-tracker__modal__form" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                className="task-tracker__modal__form__input"
                                name="taskname"
                                defaultValue={selectedTask.taskname}
                                onChange={handleInputChange}
                            />
                            <select
                                className="task-tracker__modal__form__select"
                                name="status"
                                defaultValue={selectedTask.status}
                                value={selectedTask.status}
                                onChange={handleInputChange}
                            >
                                <option value="1">Task Finished</option>
                                <option value="0">Task Pending</option>
                            </select>
                            <button className="task-tracker__modal__form__submit btn">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
};

export default TaskList;
