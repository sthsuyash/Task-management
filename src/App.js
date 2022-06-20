import React, { useState, useEffect } from 'react';

// import scss
import './index.scss';

// importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

export default function App() {
    // states
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.completed === false));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    // run once when the page reloads or first time
    useEffect(() => {
        getLocalTodos();
    }, []);


    // use effect
    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    // local storage storing
    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem('todos'));
            setTodos(todoLocal);
        }
    }

    return (
        <div className='App'>
            <header>
                <h1>Todo List</h1>
            </header>
            <Form
                todos={todos}
                setTodos={setTodos}
                inputText={inputText}
                setInputText={setInputText}
                setStatus={setStatus}
            />

            <TodoList
                todos={todos}
                setTodos={setTodos}
                filteredTodos={filteredTodos}
            />
        </div>
    );
}
