import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Home = () => {
    return (
        <div>
            <TodoForm></TodoForm>
            <TodoList></TodoList>
        </div>
    );
};

export default Home;