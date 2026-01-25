"use client";
import "../styles/globals.css";
import "../styles/themes.css";
import "../styles/animations.css";

import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-primary)",
          transition: "background-color 0.3s ease, color 0.3s ease",
          minHeight: "100vh"
        }}
      >
        <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
      </body>
    </html>
  );
}
