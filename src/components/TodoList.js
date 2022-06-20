import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, setTodos, filteredTodos }) {

    return (
        <div className="todo-container">
            <ul className='todo-list'>
                {filteredTodos.map((eachTodo) => (
                    <Todo
                        key={eachTodo.id}
                        todoText={eachTodo.text}
                        todos={todos}
                        setTodos={setTodos}
                        todo={eachTodo}
                    />
                ))}
            </ul>
        </div>
    );
};
