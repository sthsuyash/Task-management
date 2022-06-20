import React from 'react';

export default function Form(props) {

    const inputTextHandler = (e) => {
        // console.log(e.target.value);
        props.setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setTodos([
            ...props.todos,
            {
                text: props.inputText,
                completed: false,
                id: Math.floor(Math.random() * 100)
            }
        ]);
        props.setInputText("");
    };

    const statusHandler = (e) => {
        props.setStatus(e.target.value);
        // console.log(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>

            {/* todo input from user */}
            <input
                type="text"
                placeholder='Add item'
                className="todo-input"
                onChange={inputTextHandler}
                value={props.inputText}
                name="inputText"
            />

            {/* '+' button to add items */}
            <button
                className="todo-button"
                type="submit"
            // onSubmit={handleSubmit}
            ><i className="fas fa-plus-square"></i>
            </button>

            {/* filter section */}
            <div className="select">
                <select
                    name="todos"
                    className="filter-todo"
                    onChange={statusHandler}
                    value={props.status}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};
