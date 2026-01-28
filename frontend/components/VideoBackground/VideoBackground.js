"use client";

export default function VideoBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden"
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(4px)",
          opacity: 0.90
        }}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))"
        }}
      />
    </div>
  );
}
