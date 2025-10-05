import React, { useCallback } from 'react';
import useTodos from '../hooks/useTodos';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
    const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } = useTodos();

    const handleAddTodo = useCallback((text) => {
        const newTodo = {
            id: Date.now(),
            todo: text,
            completed: false,
            userId: 1,
        };
        console.log('Task added locally:', newTodo);
    }, []);


    if (isLoading) {
        return <div className="loading">Завантаження завдань...</div>;
    }

    if (error) {
        return <div className="error">Помилка завантаження: {error}</div>;
    }

    return (
        <div className="todo-list-container">
            <AddTodoForm onAddTodo={addTodo} />

            <ul className="todo-items-list">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        task={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;