import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [cards, setCards] = useState([]);
  const [deletedCards, setDeletedCards] = useState([]);

  // Fetch cards from the mock API
  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  
  const handleDelete = async (id) => {
    const cardToDelete = cards.find(card => card.id === id);
    await fetch(`http://localhost:3001/cards/${id}`, { method: "DELETE" });
    setCards(cards => cards.filter(card => card.id !== id));
    setDeletedCards(deleted => [...deleted, cardToDelete]);
  };

  
  const handleRestore = async () => {
   
    for (const card of deletedCards) {
      
      const { id, ...rest } = card;
      await fetch("http://localhost:3001/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
    }
    
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
    setDeletedCards([]); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Deckster Cards</h1>
      <button
        onClick={handleRestore}
        disabled={deletedCards.length === 0}
        className={`mb-6 px-4 py-2 rounded font-semibold transition ${
          deletedCards.length === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Generate Them Back
      </button>
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
