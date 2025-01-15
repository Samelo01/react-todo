import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, removeTodo }) => (
  <ul>
    {todoList.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} removeTodo={removeTodo} />
    ))}
  </ul>
);

export default TodoList;
