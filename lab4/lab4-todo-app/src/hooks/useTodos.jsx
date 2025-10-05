import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://dummyjson.com/todos';

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch todos');
            const data = await response.json();
            setTodos(data.todos.slice(0, 10));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);


    const toggleTodo = useCallback(async (id) => {
        const originalTodos = todos;
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
        setError(null); 

        const isLocal = id > 10000;
        if (isLocal) return;

        const todoToUpdate = originalTodos.find(t => t.id === id);

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todoToUpdate.completed }),
            });

            if (!response.ok) {
                throw new Error('API update failed');
            }

        } catch (err) {
            setTodos(originalTodos);
            setError('Toggle failed: ' + err.message);
            console.error('Toggle failed:', err.message);
        }
    }, [todos]);


    const addTodo = useCallback((text) => {
        setError(null);
        const newTodo = {
            id: Date.now(),
            todo: text,
            completed: false,
            userId: 1,
        };
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    }, []);


    const deleteTodo = useCallback(async (id) => {
        const originalTodos = todos;
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        setError(null);

        const isLocal = id > 10000;
        if (isLocal) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('API delete failed');
            }

        } catch (err) {
            setTodos(originalTodos);
            setError('Delete failed: ' + err.message);
            console.error('Delete failed:', err.message);
        }
    }, [todos]);

    return {
        todos,
        isLoading,
        error,
        deleteTodo,
        toggleTodo,
        addTodo,
    };
};

export default useTodos;