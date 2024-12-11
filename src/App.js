import React from "react";

// Custom Hook: useSemiPersistentState
function useSemiPersistentState() {
  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
  const [todoList, setTodoList] = React.useState(savedTodoList);

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

// Main App Component
function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
  const [newTodo, setNewTodo] = React.useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setNewTodo("");
  };

  const handleRemoveTodo = (index) => {
    const updatedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodoList);
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
