import React, { useContext } from "react";
import { AppContext } from "../App";
import alerticon from "../assets/img/alert-icon.svg";

const Modal = ({ modal, setShowModal, modalType, handleModal, selectedTask, setSelectedTask }) => {
    // get Context
    const { setResponse } = useContext(AppContext)

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

    let modalContent;
    if (modalType === "Edit") {
        modalContent = (
            <>
                <form onSubmit={handleUpdate}>
                    <div className="task-tracker__modal__inner__content">
                        <input
                            type="text"
                            className="task-tracker__modal__inner__content__input"
                            name="taskname"
                            defaultValue={selectedTask.taskname}
                            onChange={handleInputChange}
                        />
                        <select
                            className="task-tracker__modal__inner__content__select"
                            name="status"
                            defaultValue={selectedTask.status}
                            onChange={handleInputChange}
                        >
                            <option value="1">Task Finished</option>
                            <option value="0">Task Pending</option>
                        </select>
                    </div>
                    <div className="task-tracker__modal__inner__content__button">
                        <button className="task-tracker__modal__inner__content__button__btn btn btn-submit">
                            Save
                        </button>
                        <button type="button" className="task-tracker__modal__inner__content__button__btn btn btn-close" onClick={handleModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </>
        );
    } else {
        modalContent = (
            <>
                <div className="task-tracker__modal__inner__content">
                    <img
                        className="task-tracker__modal__inner__content__img"
                        src={alerticon}
                        alt="alert-icon"
                    />
                    <p className="task-tracker__modal__inner__content__text">
                        Are you sure you want to delete this task?
                    </p>
                    <div className="task-tracker__modal__inner__content__button">
                        <button className="task-tracker__modal__inner__content__button__btn btn btn-submit" onClick={() => handleDeleteTask(selectedTask.id)}>
                            Delete
                        </button>
                        <button type="button" className="task-tracker__modal__inner__content__button__btn btn btn-close" onClick={handleModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={ modal ? "task-tracker__modal is-opened" : "task-tracker__modal"} >
                <div className="task-tracker__modal__bg" onClick={handleModal}></div>
                <div className="task-tracker__modal__inner">
                    <p className="task-tracker__modal__inner__title">{modalType} Task</p>
                    {modalContent}
                </div>
            </div>
        </>
    );
};

export default Modal;
