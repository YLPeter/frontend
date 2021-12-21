import React from 'react'

function popupWindows(handleConfirmedFunction,id) {
    return (
        <button 
        className="delete button"
        onClick={() => {
            const confirmBox = window.confirm(
            "Do you really want to delete?"
            )
            if (confirmBox === true) {
                handleConfirmedFunction(id)
            }
        }}>
        </button>
    )
}

export default popupWindows
