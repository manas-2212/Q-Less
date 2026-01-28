"use client";

import { useRouter } from "next/navigation";

import VideoBackground from "../components/VideoBackground/VideoBackground";
import Button from "../components/Button/Button";

import "../styles/home.css";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/signup");
  };

  const handleLearnMore = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <VideoBackground />

      {/* HERO */}
      <main className="home-hero">
        <h1 className="home-title">Q-Less</h1>

        <p className="home-subtitle">
          Skip physical lines. Join queues digitally.  
          Real-time updates. Zero chaos.
        </p>

        <div className="home-actions">
          <Button onClick={handleGetStarted}>Get Started</Button>
          <Button variant="ghost" onClick={handleLearnMore}>
            Learn More
          </Button>
        </div>
      </main>

      {/* FEATURES */}
      <section id="features" className="home-features">
        <h2 className="features-title">Why to go Queueless?</h2>

        <p className="features-description">
          Q-Less removes the friction of physical waiting lines using a
          modern, real-time, digital-first experience.
        </p>

        <div className="features-grid">
          <Feature
            title="Digital Queues"
            text="Join queues remotely using your phone. No standing, no crowding."
          />
          <Feature
            title="Live Status Updates"
            text="Know your exact position in line and when you're being served."
          />
          <Feature
            title="Business Control"
            text="Businesses can create queues, call customers, and manage flow effortlessly."
          />
          <Feature
            title="Smart & Secure"
            text="JWT-based authentication with role-specific dashboards and smooth OAuth signing."
          />
        </div>
      </section>
    </>
  );
}

function Feature({ title, text }) {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}
