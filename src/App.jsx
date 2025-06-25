import { useEffect, useState } from "react";

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {cards.map(card => (
        <div key={card.id} className="bg-white shadow rounded p-4 w-64">
          <h2 className="font-bold text-xl">{card.title}</h2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
