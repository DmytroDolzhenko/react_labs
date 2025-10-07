import React, { useCallback } from 'react';
import useTodos from '../hooks/useTodos';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import TodoSearch from './TodoSearch';
import TodoPagination from './TodoPagination';

const TodoList = () => {
    const {
        todos,
        isLoading,
        error,

        deleteTodo,
        toggleTodo,
        addTodo,
        editTodo,

        search,
        setSearch,

        currentPage,
        totalPages,
        totalTodos,
        goToNextPage,
        goToPrevPage,

    } = useTodos();

    if (isLoading) {
        return <div className="loading">Завантаження завдань...</div>;
    }

    if (error) {
        return <div className="error">Помилка завантаження: {error}</div>;
    }

    const noResults = todos.length === 0 && search !== '';
    if (noResults) {
         return (
            <div className="todo-list-container">
                <TodoSearch search={search} onSearchChange={setSearch} />
                <div className="no-results">Нічого не знайдено за запитом "{search}"</div>
            </div>
         );
    }


     return (
        <div className="todo-list-container">

            <TodoSearch search={search} onSearchChange={setSearch} />

            <AddTodoForm onAddTodo={addTodo} />

            <ul className="todo-items-list">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        task={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={editTodo}
                    />
                ))}
            </ul>

            <TodoPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalTodos={totalTodos}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
            />

        </div>
    );
};

export default TodoList;