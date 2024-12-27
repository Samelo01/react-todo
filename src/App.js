import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { todoList: [] } });
        }, 2000);
      }).then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  return (
    <div>
      <h1>Todo App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm todoList={todoList} setTodoList={setTodoList} />
          <TodoList todoList={todoList} setTodoList={setTodoList} />
        </>
      )}
    </div>
  );
};

export default App;
