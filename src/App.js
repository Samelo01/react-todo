import React, { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { todoList: [] } });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ padding: "10px", fontSize: "16px", width: "60%" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {todoList.map((todo, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                width: "60%",
                margin: "10px auto",
              }}
            >
              <span>{todo}</span>
              <button
                onClick={() => handleRemoveTodo(index)}
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
