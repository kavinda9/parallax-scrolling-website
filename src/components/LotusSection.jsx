import lotusImage from "../images/lotus.png";
import "./LotusSection.css";

function LotusSection({ videoTime }) {
  // Lotus section becomes visible after clouds disappear (after 7.5s)
  const lotusStartTime = 7.5;
  const fadeInDuration = 0.5;

  // Calculate opacity for fade in
  let sectionOpacity = 0;
  if (videoTime >= lotusStartTime) {
    const fadeProgress = (videoTime - lotusStartTime) / fadeInDuration;
    sectionOpacity = Math.min(fadeProgress, 1);
  }

  // Don't render if not visible yet
  if (sectionOpacity <= 0) return null;

  // Calculate tower scroll position (tower moves up as you scroll to reveal bottom)
  const scrollProgress = Math.max(0, videoTime - lotusStartTime);
  // Move tower up slowly to reveal its full height (100vh movement reveals the 200vh tall tower)
  const towerTranslateY = -scrollProgress * 20; // Adjust multiplier to control scroll speed

  return (
    <div className="lotus-section" style={{ opacity: sectionOpacity }}>
      <div className="lotus-background" />
      <div
        className="lotus-tower-container"
        style={{
          transform: `translateX(-50%) translateY(${towerTranslateY}vh)`,
        }}
      >
        <img src={lotusImage} alt="Lotus Tower" className="lotus-tower" />
      </div>
    </div>
  );
}

export default LotusSection;
