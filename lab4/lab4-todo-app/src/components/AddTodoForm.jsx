import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTodo(text);
            setText('');
        }
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Додати нове завдання"
            />
            <button type="submit">Додати</button>
        </form>
    );
};

export default AddTodoForm;