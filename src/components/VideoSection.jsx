import { useRef, useEffect } from "react";
import earthVideo from "../videos/earth.mp4";
import "./VideoSection.css";

function VideoSection({ videoTime, onVideoTimeUpdate }) {
  const videoRef = useRef();
  const lastVideoUpdateRef = useRef(0);

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
          onVideoTimeUpdate(time);

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
  }, [onVideoTimeUpdate]);

  return (
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
  );
}

export default VideoSection;
