import React, { useState } from "react";
import Modal from "./Modal";

const TaskList = ({ task, serverError, isLoading, setResponse }) => {
    // For updating/deleting task
    const [selectedTask, setSelectedTask] = useState({});
    // For showing update modal
    const [modal, setShowModal] = useState(false);
    // For modal type
    const [modalType, setModalType] = useState("");

    /**
    Handle Modal
    * @param {number} postID - ID of task
    * @param {string} type - type of modal to show
    */
    function handleModal(postID = "", type = "") {
        setModalType(type === "Edit" ? "Edit" : "Delete");

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

        setShowModal(false);

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
                                            {val.status === 1 ? "Task Finished  ✅" : "Task Pending ⌛"}
                                        </th>
                                        <th className="task-tracker__table__tbody__tr__th">
                                            <button
                                                className="task-tracker__table__tbody__tr__th__btn btn btn-edit"
                                                onClick={() => handleModal(val.id, "Edit")}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="task-tracker__table__tbody__tr__th__btn btn btn-delete"
                                                onClick={() => handleModal(val.id, "Delete")}
                                            >
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <Modal
                    modal={modal}
                    modalType={modalType}
                    handleModal={handleModal}
                    handleUpdate={handleUpdate}
                    selectedTask={selectedTask}
                    handleInputChange={handleInputChange}
                    handleDeleteTask={handleDeleteTask}
                />
            </>
        );
    }
};

export default TaskList;
