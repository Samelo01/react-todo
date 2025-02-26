import React, { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    console.log("Submitting todo:", text); // Log todo being submitted

    try {
      await onSubmit(text);
      console.log("Todo submitted successfully:", text); // Log success
      setText(""); // ✅ Clear input
    } catch (error) {
      console.error("Error adding todo:", error); // Log error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="todoText"
        name="todoText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;