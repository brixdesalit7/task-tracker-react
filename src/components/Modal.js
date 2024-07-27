import React from "react";
import ModalButton from "./ModalButton";
import alerticon from "../assets/img/alert-icon.svg";

const Modal = ({
    modal,
    modalType,
    handleModal,
    handleUpdate,
    selectedTask,
    handleInputChange,
    setResponse,
    handleDeleteTask,
}) => {
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
                    <ModalButton
                        handleModal={handleModal}
                        type={modalType}
                        setResponse={setResponse}
                        selectedTask={selectedTask}
                    />
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
                    <ModalButton
                        handleModal={handleModal}
                        handleDeleteTask={handleDeleteTask}
                        setResponse={setResponse}
                        selectedTask={selectedTask}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <div
                className={
                    modal ? "task-tracker__modal is-opened" : "task-tracker__modal"
                }
            >
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
