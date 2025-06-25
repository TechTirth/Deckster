import React, { useState } from "react";
import "./AddCardForm.css";

export default function AddCardForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <input
        className="add-input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="add-input"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit" className="add-btn">
        Add Card
      </button>
    </form>
  );
}
