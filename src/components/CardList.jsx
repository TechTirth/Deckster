import React from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import "../styles/CardList.css";

export default function CardList({ cards, onDelete }) {
  return (
    <div className="card-grid">
      <AnimatePresence>
        {cards.map(card => (
          <Card key={card.id} card={card} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}
