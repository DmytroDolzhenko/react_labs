import React, { useState, useEffect, useCallback} from 'react';

const API_BASE_URL = 'https://dummyjson.com/todos';
const DEFAULT_LIMIT = 10;

//custom hook - usetodos
//container
//Controlled Components Pattern
//


const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [originalTodos, setOriginalTodos] = useState([]);

    const [currentPage, setCurrentPage] =  useState(1);
    const [limitPerPage, setLimitPerPage] = useState(DEFAULT_LIMIT);
    const [totalTodos, setTotalTodos] = useState(0);

    const [search, setSearch] = useState('');

    const skip = (currentPage - 1) * limitPerPage;
    const totalPages = Math.ceil(totalTodos/limitPerPage);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}?limit=${limitPerPage}&skip=${skip}`);

            if (!response.ok) throw new Error('Failed to fetch todos');

            const data = await response.json();

            setTodos(data.todos);
            setOriginalTodos(data.todos);
            setTotalTodos(data.total);


        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [limitPerPage, skip]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = useCallback((text) => {
        setError(null);
        const newTodo = {
            id: Date.now(),
            todo: text,
            completed: false,
            userId: 1,
        };
        setTodos(prevTodos => [newTodo, ...prevTodos]);
        setOriginalTodos(prev => [newTodo, ...prev]);
    }, []);

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
            setOriginalTodos(originalTodos);
            setError('Delete failed: ' + err.message);
            console.error('Delete failed:', err.message);
        }
    }, [todos]);

    const editTodo = useCallback(async (id, newTitle) => {
        const originalTodos = todos;

        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? {...todo, todo: newTitle} : todo
            )
        );
        setError(null);

        const isLocal = id > 10000;
        if(isLocal) return;

        try{
            const responce = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({todo: newTitle}),
            });
            if(!responce.ok){
                throw new Error('Api edit failed');
            }
        }
        catch(err){
            setTodos(originalTodos);
            setError('Edit failed');
        }
    }, [todos]);

   const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }, [currentPage, totalPages]);

   const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }, [currentPage]);

    const filterTodos = React.useMemo(() => {
        return todos.filter(todo =>
            todo.todo.toLowerCase().includes(search.toLowerCase())
        );
    }, [todos, search]);

    return {
        todos: filterTodos,
        isLoading,
        error,

        deleteTodo,
        toggleTodo,
        addTodo,
        editTodo,

        currentPage,
        limitPerPage,
        totalPages,
        totalTodos,
        goToNextPage,
        goToPrevPage,

        search,
        setSearch,

    };
};

export default useTodos;