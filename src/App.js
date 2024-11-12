import * as React from 'react';

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Review code" },
  { id: 3, title: "Submit project" }
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
