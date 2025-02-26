import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./components/TodoListItem.module.css";
import { FaTasks, FaSort } from "react-icons/fa";
import './components/App.css';

const API_BASE = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_AIRTABLE_TABLE_NAME}`;
const HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  "Content-Type": "application/json",
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch sorted data from Airtable (memoized)
  const fetchDataByField = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE}?sort[0][field]=Title&sort[0][direction]=${sortOrder}`,
        { headers: HEADERS }
      );
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      const data = await response.json();
      setTodos(data.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [sortOrder]);

  useEffect(() => {
    fetchDataByField();
  }, [fetchDataByField]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleAddTodo = async (todoText) => {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ records: [{ fields: { Title: todoText, Completed: false } }] }),
      });
      if (!response.ok) throw new Error(`Failed to add todo: ${response.status}`);
      await fetchDataByField(); // Refresh todos
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle completed status
  const toggleCompleted = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          fields: { Completed: !currentStatus }, // Toggle the completion status
        }),
      });
      if (!response.ok) throw new Error(`Failed to update todo: ${response.status}`);
      await fetchDataByField(); // Refresh todos
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: HEADERS,
      });
      if (!response.ok) throw new Error(`Failed to remove todo: ${response.status}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const TodoPage = () => (
    <div>
      <h1>Todo List <FaTasks /></h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <button className={styles.ToggleButton} onClick={toggleSortOrder}>
        <FaSort /> Toggle Sort Order ({sortOrder === "asc" ? "Z-A" : "A-Z"})
      </button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${styles.ListItem} ${todo.fields.Completed ? styles.Completed : ""}`}
          >
            {todo.fields.Title}
            <button
              className={styles.ToggleCompleteButton}
              onClick={() => toggleCompleted(todo.id, todo.fields.Completed)}
            >
              {todo.fields.Completed ? "✔" : "❌"} {/* Show checkmark or X */}
            </button>
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
  
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="home-link">Home</Link>
        <Link to="/todos" className="todos-link">Todos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to Todo App</h1>} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
