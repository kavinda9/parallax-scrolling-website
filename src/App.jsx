import { useState } from "react";
import VideoSection from "./components/VideoSection";
import CloudsTransition from "./components/CloudsTransition";
import "./App.css";

function App() {
  const [videoTime, setVideoTime] = useState(0);

  return (
    <div className="app-container">
      {/* Video Section */}
      <VideoSection videoTime={videoTime} onVideoTimeUpdate={setVideoTime} />

      {/* Clouds Transition */}
      <CloudsTransition videoTime={videoTime} />

      {/* Debug info */}
      <div className="debug-info">Time: {videoTime.toFixed(1)}s</div>

      {/* Scroll spacer */}
      <div className="scroll-spacer" />
    </div>
  );
}

export default App;
