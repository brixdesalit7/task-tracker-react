import React, { useState, useContext } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { AppContext } from "../App";

const TaskList = ({ serverError, isLoading }) => {
    // For updating/deleting task
    const [selectedTask, setSelectedTask] = useState({});
    // get Context
    const { task } = useContext(AppContext);
    // For modal type
    const [modalType, setModalType] = useState("");
    // For showing update modal
    const [modal, setShowModal] = useState(false);


    /** Handle Modal
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

    if (isLoading) {
        return <Spinner/>;
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
                setShowModal={setShowModal}
                handleModal={handleModal} 
                selectedTask={selectedTask} 
                setSelectedTask={setSelectedTask} />
            </>
        );
    }
};

export default TaskList;
