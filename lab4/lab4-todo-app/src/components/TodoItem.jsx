import React from 'react';

const TodoItem = ({ task, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span className="todo-text">{task.todo}</span>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
                &times;
            </button>
        </li>
    );
};

export default TodoItem;