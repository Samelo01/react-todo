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

  // STEP 1: Fetch data from Airtable, sorted by Grid view order
  const fetchDataByView = async () => {
    try {
      console.log("Fetching data from Airtable... (Grid view)"); // Log before fetching
      const response = await fetch(`${API_BASE}?view=Grid%20view`, { headers: HEADERS });
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      const data = await response.json();
      setTodos(data.records);
      console.log("Data fetched successfully:", data); // Log after successful fetch
    } catch (error) {
      console.error("Error fetching data:", error); // Log error
    }
  };

  // STEP 2: Fetch data sorted by Airtable field (Title)
  const fetchDataByField = async () => {
    try {
      console.log("Fetching data from Airtable... (Sorted by Title field)"); // Log before fetching
      const response = await fetch(`${API_BASE}?sort[0][field]=Title&sort[0][direction]=${sortOrder}`, { headers: HEADERS });
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      const data = await response.json();
      setTodos(data.records);
      console.log("Data fetched successfully:", data); // Log after successful fetch
    } catch (error) {
      console.error("Error fetching data:", error); // Log error
    }
  };

  // STEP 3: Fetch data normally and sort on frontend using JavaScript
  const fetchDataAndSortFrontend = async () => {
    try {
      console.log("Fetching data from Airtable... (Frontend sort)"); // Log before fetching
      const response = await fetch(API_BASE, { headers: HEADERS });
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
      const data = await response.json();

      // Sort dynamically based on sortOrder state
      data.records.sort((a, b) => 
        sortOrder === "asc" 
          ? a.fields.Title.localeCompare(b.fields.Title) 
          : b.fields.Title.localeCompare(a.fields.Title)
      );

      setTodos(data.records);
      console.log("Data fetched and sorted successfully:", data); // Log after successful fetch and sort
    } catch (error) {
      console.error("Error fetching data:", error); // Log error
    }
  };

  // Fetch data when component mounts or sort order changes
  useEffect(() => {
    fetchDataByField(); // Default: Fetch and sort by Airtable field order
  }, [sortOrder]);

  // Toggle sorting order (A-Z or Z-A)
  const toggleSortOrder = () => {
    console.log("Toggling sort order:", sortOrder); // Log sort order toggle
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Handle adding a todo
  const handleAddTodo = async (text) => {
    const newTodo = { fields: { Title: text } };
    try {
      console.log("Adding new todo to Airtable:", newTodo); // Log before adding todo
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ records: [newTodo] }),
      });

      if (!response.ok) throw new Error(`Failed to add todo: ${response.status}`);
      const data = await response.json();
      console.log("Todo added successfully:", data); // Log after successful add
      fetchDataByField(); // Refresh the todo list
    } catch (error) {
      console.error("Error adding todo:", error); // Log error
    }
  };

  // Handle removing a todo
  const handleRemoveTodo = async (todoId) => {
    try {
      console.log("Removing todo with ID:", todoId); // Log todo ID before removal
      const response = await fetch(`${API_BASE}/${todoId}`, {
        method: "DELETE",
        headers: HEADERS,
      });

      if (!response.ok) throw new Error(`Failed to remove todo: ${response.status}`);
      const data = await response.json();
      console.log("Todo removed successfully:", data); // Log after successful removal
      fetchDataByField(); // Refresh the todo list
    } catch (error) {
      console.error("Error removing todo:", error); // Log error
    }
  };

  const TodoPage = () => (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <button className={styles.ToggleButton} onClick={toggleSortOrder}>
        Toggle Sort Order ({sortOrder === "asc" ? "A-Z" : "Z-A"})
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.ListItem}>
            {todo.fields.Title}
            <button className={styles.RemoveButton} onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
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
