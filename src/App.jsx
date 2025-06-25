import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [cards, setCards] = useState([]);

  // Fetch cards from the mock API
  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Deckster Cards</h1>
      <div className="flex flex-wrap gap-6">
        <AnimatePresence>
          {cards.map(card => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-lg p-6 w-64"
            >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
              {/* Delete button will go here later */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
