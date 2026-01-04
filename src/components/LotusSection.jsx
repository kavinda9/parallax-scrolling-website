import lotusImage from "../images/lotus.png";
import building1 from "../images/building1.png";
import building2 from "../images/building2.png";
import building3 from "../images/building3.png";
import "./LotusSection.css";

function LotusSection({ videoTime }) {
  // Lotus section becomes visible after clouds disappear (after 7.5s)
  const lotusStartTime = 7.5;
  const fadeInDuration = 0.5;

  // Tower shrink duration (time it takes to go from 200vh to 100vh)
  const shrinkDuration = 5; // 5 seconds to fully shrink
  const shrinkEndTime = lotusStartTime + fadeInDuration + shrinkDuration;

  // Calculate opacity for fade in
  let sectionOpacity = 0;
  if (videoTime >= lotusStartTime) {
    const fadeProgress = (videoTime - lotusStartTime) / fadeInDuration;
    sectionOpacity = Math.min(fadeProgress, 1);
  }

  // Don't render if not visible yet
  if (sectionOpacity <= 0) return null;

  // Calculate tower scroll and shrink
  const scrollProgress = Math.max(
    0,
    videoTime - (lotusStartTime + fadeInDuration)
  );
  const shrinkProgress = Math.min(scrollProgress / shrinkDuration, 1);

  // Tower height: starts at 200vh, ends at 100vh
  const towerHeight = 200 - shrinkProgress * 100; // 200 -> 100

  // Tower will always sit at bottom: 0, but we control visibility with overflow
  // The image inside is positioned to show the bottom part that's currently at height
  const imageOffsetTop = 200 - towerHeight; // How much to hide from top

  // Buildings appear when tower is halfway shrunk (at 150vh)
  const buildingStartProgress = Math.max(0, shrinkProgress - 0.5) / 0.5; // 0 to 1

  // Buildings rise from bottom (start at 100vh below, end at 0)
  const building1TranslateY = 100 - buildingStartProgress * 100; // Slowest (farthest)
  const building2TranslateY = 100 - buildingStartProgress * 100; // Medium
  const building3TranslateY = 100 - buildingStartProgress * 100; // Fastest (closest)

  // Building opacity
  const buildingOpacity = buildingStartProgress;

  return (
    <div className="lotus-section" style={{ opacity: sectionOpacity }}>
      {/* Fixed cyan background */}
      <div className="lotus-background" />

      {/* Building Layer 1 - Farthest */}
      {buildingOpacity > 0 && (
        <div
          className="building-layer building-1"
          style={{
            transform: `translateY(${building1TranslateY}vh)`,
            opacity: buildingOpacity,
          }}
        >
          <img src={building1} alt="Building 1" className="building-image" />
        </div>
      )}

      {/* Building Layer 2 - Middle */}
      {buildingOpacity > 0 && (
        <div
          className="building-layer building-2"
          style={{
            transform: `translateY(${building2TranslateY}vh)`,
            opacity: buildingOpacity,
          }}
        >
          <img src={building2} alt="Building 2" className="building-image" />
        </div>
      )}

      {/* Building Layer 3 - Closest */}
      {buildingOpacity > 0 && (
        <div
          className="building-layer building-3"
          style={{
            transform: `translateY(${building3TranslateY}vh)`,
            opacity: buildingOpacity,
          }}
        >
          <img src={building3} alt="Building 3" className="building-image" />
        </div>
      )}

      {/* Lotus Tower - Shrinks, bottom aligned with buildings */}
      <div
        className="lotus-tower-container"
        style={{
          height: `${towerHeight}vh`,
        }}
      >
        <img
          src={lotusImage}
          alt="Lotus Tower"
          className="lotus-tower"
          style={{
            height: `200vh`,
            marginTop: `${-imageOffsetTop}vh`,
          }}
        />
      </div>
    </div>
  );
}

export default LotusSection;
