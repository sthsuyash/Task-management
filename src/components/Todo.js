import React from 'react';

export default function Todo({ todo, todoText, todos, setTodos }) {
    // event handler
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id));
    };

    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item,
                    completed: true
                }
            }
            return item;
        }))
    };

    console.log(todos);

    return (
        <div className='todo'>
            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>{todoText}</li>
            <button className='complete-btn' onClick={completeHandler}>
                <i className='fas fa-check'></i>
            </button>
            <button className='trash-btn' onClick={deleteHandler}>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    );
}
