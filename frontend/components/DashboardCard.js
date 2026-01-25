"use client";

import { motion } from "framer-motion";
import "../styles/cards.css";

export default function DashboardCard({ title, value }) {
  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </motion.div>
  );
}
