// src/App.js
import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// Airtable API details
const API_BASE = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_AIRTABLE_TABLE_NAME}`; // Correct Base ID
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
      throw error; // Throw the error as suggested
    }
  };

  // Add a new todo to Airtable
  const addTodo = async (todoText) => {
    const newRecord = {
      fields: { Title: todoText },
    };

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
      throw error; // Throw the error as suggested
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
      throw error; // Throw the error as suggested
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
            {todo.fields.Title}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;