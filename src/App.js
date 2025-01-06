import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
        resolve({ data: { todoList: savedTodos } });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, { id: Date.now(), text: newTodo }]);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm addTodo={addTodo} />
          <TodoList todoList={todoList} removeTodo={removeTodo} />
        </>
      )}
    </div>
  );
};

export default App;