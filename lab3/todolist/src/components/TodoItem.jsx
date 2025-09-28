import {useState} from 'react';

function TodoItem({task, onDelete}) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleToggle = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
            <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggle}
            />
            <span className='todo-text'>{task.text}</span>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
                &times;
            </button>
        </li>
    );
}

export default TodoItem;