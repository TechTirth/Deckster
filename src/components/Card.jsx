import React from "react";
import { motion } from "framer-motion";
import "./Card.css";

const addVariants = {
  initial: { scale: 0.7, opacity: 0, y: 60, filter: "blur(8px)" },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 24, duration: 0.65 }
  }
};

const deleteVariants = {
  exit: {
    scale: 0.5,
    opacity: 0,
    y: -60,
    filter: "blur(12px)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function Card({ card, onDelete }) {
  return (
    <motion.div
      className="neon-card"
      variants={{ ...addVariants, ...deleteVariants }}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.07, boxShadow: "0 0 32px #ff6200cc" }}
    >
      <button className="delete-btn" onClick={() => onDelete(card.id)}>&times;</button>
      <h2>{card.title}</h2>
      <p>{card.description}</p>
    </motion.div>
  );
}
