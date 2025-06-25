import React from "react";
import Card from "./Card";
import "./CardList.css";

export default function CardList({ cards, onDelete }) {
  return (
    <div className="card-grid">
      {cards.map(card => (
        <Card key={card.id} card={card} onDelete={onDelete} />
      ))}
    </div>
  );
}
