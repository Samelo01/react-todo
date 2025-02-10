import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./components/TodoListItem.module.css";

// Airtable API details
const API_BASE = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_AIRTABLE_TABLE_NAME}`;
const HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
  "Content-Type": "application/json",
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data sorted by Airtable field (Title)
  const fetchDataByField = async () => {
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
  };

  useEffect(() => {
    fetchDataByField();
  }, [sortOrder]);

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Function to add a new todo to Airtable
  const handleAddTodo = async (todoText) => {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ records: [{ fields: { Title: todoText } }] }),
      });

      if (!response.ok) throw new Error(`Failed to add todo: ${response.status}`);
      await fetchDataByField(); // Refresh todos after adding
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to remove a todo
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
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <button className={styles.ToggleButton} onClick={toggleSortOrder}>
        Toggle Sort Order ({sortOrder === "asc" ? "Z-A" : "A-Z"})
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.ListItem}>
            {todo.fields.Title}
            <button className={styles.RemoveButton} onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
