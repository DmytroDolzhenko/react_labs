import React from "react";

const TodoPagination = ({
    currentPage,
    totalPages,
    totalTodos,
    goToNextPage,
    goToPrevPage
}) => {
    if(totalPages <= 1 || totalTodos === 0) return null;

    return (
        <div className="todo-pagination">
            <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
            >
               Попередня
            </button>

            <span>
                Сторінка {currentPage} з {totalPages} (Всього завдань: {totalTodos})
            </span>

            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                Наступна
            </button>
        </div>
    );
};

export default TodoPagination;