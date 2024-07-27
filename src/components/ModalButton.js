import React from 'react'

const ModalButton = ({ type, handleModal, selectedTask, handleDeleteTask }) => {
    // Type of Button
    let buttonType;
    if (type === "Edit") {
        buttonType = (
            <button className="task-tracker__modal__inner__content__button__btn btn btn-submit">
                Edit
            </button>
        )
    } else {
        buttonType = (
            <button className="task-tracker__modal__inner__content__button__btn btn btn-submit" onClick={() => handleDeleteTask(selectedTask.id)}>
                Delete
            </button>
        )
    }

    return (
        <div className="task-tracker__modal__inner__content__button">
            {buttonType}
            <button type="button" className="task-tracker__modal__inner__content__button__btn btn btn-close" onClick={handleModal}>
                Cancel
            </button>
        </div>
    )
}

export default ModalButton