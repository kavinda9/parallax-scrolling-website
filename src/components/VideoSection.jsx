import { useRef, useEffect } from "react";
import earthVideo from "../videos/earth.mp4";
import "./VideoSection.css";

function VideoSection({ videoTime, onVideoTimeUpdate }) {
  const videoRef = useRef();
  const lastVideoUpdateRef = useRef(0);

  // Hide video after clouds disappear (8.0s)
  const videoHideTime = 8.0;
  const shouldShowVideo = videoTime < videoHideTime;

  useEffect(() => {
    let ticking = false;
    let lastTime = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? scrolled / maxScroll : 0;

          // Map scroll to extended time (0-20 seconds for 800vh scroll space)
          const time = progress * 20;

          // Only update if time actually changed
          if (Math.abs(time - lastTime) > 0.01) {
            onVideoTimeUpdate(time);
            lastTime = time;
          }

          // Throttle video seeking to every 100ms
          const now = Date.now();
          if (now - lastVideoUpdateRef.current > 100) {
            if (videoRef.current && videoRef.current.duration) {
              // Video still only plays 0-8 seconds max
              const videoTime = Math.min(time, videoRef.current.duration);
              videoRef.current.currentTime = videoTime;
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
    <div
      className="video-section"
      style={{
        opacity: shouldShowVideo ? 1 : 0,
        pointerEvents: shouldShowVideo ? "auto" : "none",
      }}
    >
      {shouldShowVideo && (
        <video
          ref={videoRef}
          src={earthVideo}
          className="earth-video"
          muted
          playsInline
          preload="auto"
        />
      )}
    </div>
  );
}

export default VideoSection;
