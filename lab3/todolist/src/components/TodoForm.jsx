import { useState } from "react";

function AddTodoForm({onAddTodo}) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo(inputValue);
        setInputValue('');
    };

    return(
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;