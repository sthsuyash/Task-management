import React from 'react';

export default function Form({setInputText}) {

    const inputTextHandler = (e) => {
        // console.log(e.target.value);
        setInputText(e.target.value);
    }

    return (
        <form>
            {/* todo input from user */}
            <input
                type="text"
                placeholder='Add item'
                className="todo-input"
                onChange={inputTextHandler}
                // value={formData.todoInput}
                name="todoInput"
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
                // onChange={handleChange}
                // value={formData.todos}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}