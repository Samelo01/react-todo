import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');  

  const handleSubmit = (e) => {
    e.preventDefault();  
    if (title.trim()) {
      addTodo(title);  
      setTitle('');  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}  
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;