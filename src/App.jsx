import { useRef, useEffect, useState } from "react";
import earthVideo from "./videos/earth.mp4";
import cloud1 from "./images/cloud1.png";
import cloud2 from "./images/cloud2.png";
import cloud3 from "./images/cloud3.png";
import "./App.css";

function App() {
  const videoRef = useRef();
  const [videoTime, setVideoTime] = useState(0);
  const lastVideoUpdateRef = useRef(0);

  // Cloud configuration
  const clouds = [
    // First 5 clouds at 5.4s - 4 corners + center (grow 3x, corners move towards middle)
    {
      id: 1,
      image: cloud1,
      spawnTime: 5.4,
      startX: 0,
      startY: 0,
      moveToX: 20,
      moveToY: 20,
      anchor: "top-left",
      maxGrowth: 3,
    },
    {
      id: 2,
      image: cloud2,
      spawnTime: 5.4,
      startX: 100,
      startY: 0,
      moveToX: 80,
      moveToY: 20,
      anchor: "top-right",
      maxGrowth: 3,
    },
    {
      id: 3,
      image: cloud3,
      spawnTime: 5.4,
      startX: 0,
      startY: 100,
      moveToX: 20,
      moveToY: 80,
      anchor: "bottom-left",
      maxGrowth: 3,
    },
    {
      id: 4,
      image: cloud1,
      spawnTime: 5.4,
      startX: 100,
      startY: 100,
      moveToX: 80,
      moveToY: 80,
      anchor: "bottom-right",
      maxGrowth: 3,
    },
    {
      id: 5,
      image: cloud2,
      spawnTime: 5.4,
      startX: 50,
      startY: 50,
      moveToX: 50,
      moveToY: 50,
      anchor: "center",
      maxGrowth: 3,
    },

    // Next 3 clouds at 6.5s - rest of space (grow 2x)
    {
      id: 6,
      image: cloud3,
      spawnTime: 6.5,
      startX: 50,
      startY: 15,
      moveToX: 50,
      moveToY: 15,
      anchor: "center",
      maxGrowth: 2,
    },
    {
      id: 7,
      image: cloud1,
      spawnTime: 6.5,
      startX: 15,
      startY: 50,
      moveToX: 15,
      moveToY: 50,
      anchor: "center",
      maxGrowth: 2,
    },
    {
      id: 8,
      image: cloud2,
      spawnTime: 6.5,
      startX: 85,
      startY: 50,
      moveToX: 85,
      moveToY: 50,
      anchor: "center",
      maxGrowth: 2,
    },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrolled / maxScroll;

          // Map scroll to video time (0-8 seconds)
          const time = progress * 8;
          setVideoTime(time);

          // Throttle video seeking to every 100ms
          const now = Date.now();
          if (now - lastVideoUpdateRef.current > 100) {
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = Math.min(
                time,
                videoRef.current.duration
              );
            }
            lastVideoUpdateRef.current = now;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Video Section - Fixed */}
      <div className="video-section">
        <video
          ref={videoRef}
          src={earthVideo}
          className="earth-video"
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Clouds Section */}
      <div className="clouds-section">
        {clouds.map((cloud) => {
          // Only show cloud if video time >= spawn time
          if (videoTime < cloud.spawnTime) return null;

          // Calculate how long this cloud has been visible
          const cloudAge = videoTime - cloud.spawnTime;

          // Clouds grow over time (1.5 seconds to reach max size)
          const growthProgress = Math.min(cloudAge / 1.5, 1);
          const currentScale = 1 + growthProgress * (cloud.maxGrowth - 1);

          // Corner clouds move towards middle over 2 seconds
          const moveProgress = Math.min(cloudAge / 2, 1);
          const currentX =
            cloud.startX + (cloud.moveToX - cloud.startX) * moveProgress;
          const currentY =
            cloud.startY + (cloud.moveToY - cloud.startY) * moveProgress;

          // Opacity fades in quickly
          const opacity = Math.min(cloudAge / 0.5, 1);

          // Get transform based on anchor point
          const getTransform = (anchor, scale) => {
            switch (anchor) {
              case "top-left":
                return `translate(0%, 0%) scale(${scale})`;
              case "top-right":
                return `translate(-100%, 0%) scale(${scale})`;
              case "bottom-left":
                return `translate(0%, -100%) scale(${scale})`;
              case "bottom-right":
                return `translate(-100%, -100%) scale(${scale})`;
              case "center":
              default:
                return `translate(-50%, -50%) scale(${scale})`;
            }
          };

          return (
            <img
              key={cloud.id}
              src={cloud.image}
              alt="cloud"
              className="cloud-full"
              style={{
                left: `${currentX}%`,
                top: `${currentY}%`,
                transform: getTransform(cloud.anchor, currentScale),
                opacity: opacity,
              }}
            />
          );
        })}

        {/* Text appears at 6.5s */}
        {videoTime >= 6.5 && (
          <div
            className="cloud-text-container"
            style={{
              opacity: Math.min((videoTime - 6.5) / 0.5, 1),
            }}
          >
            <h1 className="cloud-text">Welcome to Sri Lanka</h1>
          </div>
        )}
      </div>

      {/* Progress indicator - REMOVED */}
      {/* <div className="scroll-indicator">
        <div className="time-display">{videoTime.toFixed(1)}s</div>
        <div className="scroll-progress">
          <div
            className="scroll-bar"
            style={{ height: `${(videoTime / 8) * 100}%` }}
          />
        </div>
      </div> */}

      {/* Scroll spacer */}
      <div className="scroll-spacer" />
    </div>
  );
}

export default App;
