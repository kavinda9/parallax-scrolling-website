import { useRef, useEffect, useState } from "react";
import earthVideo from "./videos/earth.mp4";
import cloud1 from "./images/cloud1.png";
import cloud2 from "./images/cloud2.png";
import cloud3 from "./images/cloud3.png";
import "./App.css";

function App() {
  const videoRef = useRef();
  const [videoTime, setVideoTime] = useState(0);

  // 10 clouds with specific spawn times
  const [clouds] = useState(() => {
    const cloudImages = [cloud1, cloud2, cloud3];
    return [
      // First 5 clouds appear at 6s
      {
        id: 1,
        image: cloudImages[0],
        spawnTime: 6.0,
        x: 30,
        y: 40,
        scale: 0.5,
      },
      {
        id: 2,
        image: cloudImages[1],
        spawnTime: 6.0,
        x: 70,
        y: 35,
        scale: 0.6,
      },
      {
        id: 3,
        image: cloudImages[2],
        spawnTime: 6.0,
        x: 50,
        y: 60,
        scale: 0.4,
      },
      {
        id: 4,
        image: cloudImages[0],
        spawnTime: 6.0,
        x: 20,
        y: 70,
        scale: 0.55,
      },
      {
        id: 5,
        image: cloudImages[1],
        spawnTime: 6.0,
        x: 80,
        y: 65,
        scale: 0.45,
      },

      // Next 3 clouds appear at 7s
      {
        id: 6,
        image: cloudImages[2],
        spawnTime: 7.0,
        x: 40,
        y: 25,
        scale: 0.5,
      },
      {
        id: 7,
        image: cloudImages[0],
        spawnTime: 7.0,
        x: 60,
        y: 75,
        scale: 0.6,
      },
      {
        id: 8,
        image: cloudImages[1],
        spawnTime: 7.0,
        x: 15,
        y: 50,
        scale: 0.4,
      },

      // Last 2 clouds appear at 7.5s
      {
        id: 9,
        image: cloudImages[2],
        spawnTime: 7.5,
        x: 85,
        y: 45,
        scale: 0.55,
      },
      {
        id: 10,
        image: cloudImages[0],
        spawnTime: 7.5,
        x: 55,
        y: 20,
        scale: 0.5,
      },
    ];
  });

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

          // Update video currentTime
          if (videoRef.current && videoRef.current.duration) {
            videoRef.current.currentTime = Math.min(
              time,
              videoRef.current.duration
            );
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

          // Clouds grow over time (0.5s to reach full size)
          const growthProgress = Math.min(cloudAge / 0.5, 1);
          const currentScale = cloud.scale + growthProgress * 1.5;

          // Opacity fades in quickly
          const opacity = Math.min(cloudAge / 0.3, 1) * 0.8;

          return (
            <img
              key={cloud.id}
              src={cloud.image}
              alt="cloud"
              className="cloud"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                transform: `translate(-50%, -50%) scale(${currentScale})`,
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

      {/* Progress indicator */}
      <div className="scroll-indicator">
        <div className="time-display">{videoTime.toFixed(1)}s</div>
        <div className="scroll-progress">
          <div
            className="scroll-bar"
            style={{ height: `${(videoTime / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Scroll spacer */}
      <div className="scroll-spacer" />
    </div>
  );
}

export default App;
