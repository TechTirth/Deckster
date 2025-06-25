import React, { useEffect, useState } from "react";
import AddCardForm from "./components/AddCardForm";
import CardList from "./components/CardList";

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then(res => res.json())
      .then(data => setCards(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/cards/${id}`, { method: "DELETE" });
    setCards(cards => cards.filter(card => card.id !== id));
  };

  const handleAdd = async ({ title, description }) => {
    const res = await fetch("http://localhost:3001/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const newCard = await res.json();
    setCards(cards => [...cards, newCard]);
  };

  return (
    <div className="app-bg">
      <div className="container">
        <h1 className="main-title">Deckster Cards</h1>
        <AddCardForm onAdd={handleAdd} />
        <CardList cards={cards} onDelete={handleDelete} />
      </div>
    </div>
  );
}
