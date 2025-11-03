import React from "react";

const TodoSearch = ({search, onSearchChange}) => {
    return(
        <div className="todo-search">
            <input
            type="text"
            placeholder="Пошук"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search todos"
            />
        </div>
    );
};

export default React.memo(TodoSearch);