import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch cards from the mock API
  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/cards/${id}`, { method: "DELETE" });
    setCards(cards => cards.filter(card => card.id !== id));
  };

  // Add card handler
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const res = await fetch("http://localhost:3001/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const newCard = await res.json();
    setCards(cards => [...cards, newCard]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Deckster Cards</h1>
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          className="border rounded px-2 py-1"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Add Card
        </button>
      </form>
      <div className="flex flex-wrap gap-6">
        <AnimatePresence>
          {cards.map(card => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-lg p-6 w-64 relative"
            >
              <button
                onClick={() => handleDelete(card.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label="Delete card"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
