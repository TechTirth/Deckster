import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function App() {
  const [cards, setCards] = useState([]);

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
