import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";  // Updated path
import styles from "./components/TodoListItem.module.css";  // Updated path

// Airtable API details
const API_BASE = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_AIRTABLE_TABLE_NAME}`;
const HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  "Content-Type": "application/json",
};

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch data from Airtable
  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE, { headers: HEADERS });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add a new todo to Airtable
  const addTodo = async (todoText) => {
    const newRecord = { fields: { Title: todoText } };

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ records: [newRecord] }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, ...data.records]);
    } catch (error) {
      console.error("Failed to add todo:", error.message);
    }
  };

  // Remove a todo from Airtable
  const removeTodo = async (todoId) => {
    try {
      const response = await fetch(`${API_BASE}/${todoId}`, {
        method: "DELETE",
        headers: HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Failed to remove todo: ${response.status}`);
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Failed to remove todo:", error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const TodoPage = () => (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.ListItem}>
            {todo.fields.Title}
            <button
              className={styles.RemoveButton}
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const NewTodoPage = () => (
    <div>
      <h1>New Todo List</h1>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/new" element={<NewTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
