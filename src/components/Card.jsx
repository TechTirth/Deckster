import React from "react";
import "./Card.css";

export default function Card({ card, onDelete }) {
  return (
    <div className="card">
      <button
        onClick={() => onDelete(card.id)}
        className="delete-btn"
        aria-label="Delete card"
      >
        &times;
      </button>
      <h2 className="card-title">{card.title}</h2>
      <p className="card-desc">{card.description}</p>
    </div>
  );
}
