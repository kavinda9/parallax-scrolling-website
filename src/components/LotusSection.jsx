import "./LotusSection.css";

function LotusSection({ videoTime }) {
  // Lotus section becomes visible when text would have appeared (6.5s)
  const lotusStartTime = 6.5;
  const fadeInDuration = 0.5;

  // Calculate opacity for fade in
  let sectionOpacity = 0;
  if (videoTime >= lotusStartTime) {
    const fadeProgress = (videoTime - lotusStartTime) / fadeInDuration;
    sectionOpacity = Math.min(fadeProgress, 1);
  }

  // Don't render if not visible yet
  if (sectionOpacity <= 0) return null;

  return (
    <div className="lotus-section" style={{ opacity: sectionOpacity }}>
      <div className="lotus-background">
        {/* Cyan/Light blue background */}
        <h2 className="lotus-title">Lotus Tower Section</h2>
        <p className="lotus-subtitle">Background ready for tower & buildings</p>
      </div>
    </div>
  );
}

export default LotusSection;
