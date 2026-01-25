"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false
}) {
  const styles = {
    primary: {
      background: "var(--button-bg)",
      color: "var(--button-text)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
      border: "1px solid rgba(255,255,255,0.2)"
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: "0.75rem 1.5rem",
        borderRadius: "10px",
        border: "none",
        fontSize: "0.95rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        outline: "none"
      }}
    >
      {children}
    </motion.button>
  );
}
