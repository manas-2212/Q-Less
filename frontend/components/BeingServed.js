"use client";

import "../styles/beingServed.css";

export default function BeingServed() {
  return (
    <div className="being-served-container">
      <video
        className="being-served-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className="being-served-overlay">
        <h1>You are being served</h1>
        <p>Please proceed when called</p>
      </div>
    </div>
  );
}
