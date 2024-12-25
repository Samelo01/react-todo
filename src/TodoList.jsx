import React from 'react';

const TodoList = ({ todoList, onRemoveTodo }) => (
    <ul>
        {todoList.map((todo) => (
            <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
            </li>
        ))}
    </ul>
);

export default TodoList;
