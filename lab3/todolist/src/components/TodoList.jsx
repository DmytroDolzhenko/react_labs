import { useState } from "react";
import AddTodoForm from './TodoForm';
import TodoItem from './TodoItem';

function ToDoList()
{
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (newTodoText) => {
        if (newTodoText.trim() === "") return;
        const newTodo = {
            id: Date.now(),
            text: newTodoText,
        };
        setTodos([...todos, newTodo]);
    };

    const handleDeleteTodo = (idToDelete) => {
        setTodos(todos.filter(todo => todo.id !== idToDelete))
    };

    return (
    <div className="todo-list-container">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul className="todo-items-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );

}

export default ToDoList;