import * as React from 'react';

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Read a book" },
  { id: 3, title: "Go grocery shopping" },
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
