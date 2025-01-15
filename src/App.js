import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";

// Airtable API details
const API_BASE = "https://api.airtable.com/v0/appG0eZm9k8QxyX4G/Default"; // Correct Base ID
const HEADERS = {
  Authorization: `Bearer patgzRbxdSabSy0Xr.72ba65f33002e147496cb710c86a48c77dbfe3fc5f0e630aae3dfc3182a676d5`, // Correct token format
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
    if (!todoText) {
      console.error("Todo text is required");
      return;
    }

    const newRecord = {
      fields: { Title: todoText }, // Use the correct field name "Title"
    };

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ records: [newRecord] }), // Ensure correct structure for records
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, ...data.records]); // Use data.records to update todos
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

      // Remove the deleted todo from state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Failed to remove todo:", error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.fields.Title}{" "}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
