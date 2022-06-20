import React, { useState } from 'react';

// import scss
import './index.scss';

// importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

export default function App() {
    const [inputText, setInputText] = useState('');
    return (
        <div className='App'>
            <header>
                <h1>Todo List {inputText}</h1>
            </header>
            <Form setInputText={setInputText} />
            <TodoList />
        </div>
    );
}
