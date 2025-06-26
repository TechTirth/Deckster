import React from "react";
import { motion } from "framer-motion";
import "./Card.css";

const addVariants = {
  initial: { opacity: 0, y: 80, scale: 0.7, rotateX: 45 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 400, damping: 30, duration: 0.7 }
  }
};

const deleteVariants = {
  exit: {
    opacity: 0,
    y: -80,
    scale: 0.6,
    rotateX: -45,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
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
      whileHover={{
        scale: 1.08,
        rotateY: 12,
        rotateX: -6,
        boxShadow: "0 0 64px #ff6200cc, 0 8px 32px #ff620088",
        transition: { type: "spring", stiffness: 250, damping: 18 }
      }}
    >
      <button className="delete-btn" onClick={() => onDelete(card.id)}>&times;</button>
      <h2>{card.title}</h2>
      <p>{card.description}</p>
    </motion.div>
  );
}
