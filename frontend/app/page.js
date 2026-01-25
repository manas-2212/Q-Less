import VideoBackground from "../components/VideoBackground/VideoBackground";
import Button from "../components/Button/Button";

export default function Home() {
  return (
    <>
      <VideoBackground />

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          position: "relative",
          zIndex: 1
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            letterSpacing: "-0.03em"
          }}
        >
          QueueLess
        </h1>

        <p
          style={{
            opacity: 0.8,
            fontSize: "1.1rem",
            maxWidth: "480px",
            textAlign: "center"
          }}
        >
          Skip physical lines. Join queues digitally.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Button>Get Started</Button>
          <Button variant="ghost">Learn More</Button>
        </div>
      </main>
    </>
  );
}
