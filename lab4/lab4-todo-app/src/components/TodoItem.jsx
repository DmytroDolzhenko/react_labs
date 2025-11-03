import React, { useState } from 'react';

const TodoItem = ({ task, onToggle, onDelete, onEdit }) => {

        const [isEditing, setIsEditing] = useState(false);
        const [editText, setEditText] = useState(task.todo);
        const handleDeleteClick = () => onDelete(task.id);
        const handleToggleClick = () => onToggle(task.id);

        const handleSave = () => {
            if(editText.trim() !== '' && editText !== task.todo){
                onEdit(task.id, editText);
            }
            setIsEditing(false);
        }

        const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }

    };

    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleClick}
                disabled={isEditing}
            />

            {isEditing ? (
                <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
                    {task.todo}
                </span>
            )}

            {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                    Зберегти
                </button>
            ) : (
                <>
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        Ред.
                    </button>
                    <button className="delete-btn" onClick={handleDeleteClick}>
                        &times;
                    </button>
                </>
            )}
        </li>
    );
};


export default React.memo(TodoItem);