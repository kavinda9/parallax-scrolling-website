import cloud1 from "../images/cloud1.png";
import cloud2 from "../images/cloud2.png";
import cloud3 from "../images/cloud3.png";
import "./CloudsTransition.css";

function CloudsTransition({ videoTime }) {
  // Cloud configuration
  const clouds = [
    // First 5 clouds at 5.4s - corners + center (grow 3x)
    {
      id: 1,
      image: cloud1,
      spawnTime: 5.4,
      x: 0,
      y: 0,
      anchor: "top-left",
      maxGrowth: 3,
    },
    {
      id: 2,
      image: cloud2,
      spawnTime: 5.4,
      x: 100,
      y: 0,
      anchor: "top-right",
      maxGrowth: 3,
    },

    {
      id: 4,
      image: cloud1,
      spawnTime: 5.4,
      x: 100,
      y: 100,
      anchor: "bottom-right",
      maxGrowth: 3,
    },
    {
      id: 5,
      image: cloud2,
      spawnTime: 5.4,
      x: 50,
      y: 50,
      anchor: "center",
      maxGrowth: 3,
    },

    {
      id: 7,
      image: cloud1,
      spawnTime: 6.5,
      x: 25,
      y: 50,
      anchor: "center",
      maxGrowth: 2,
    },
    {
      id: 8,
      image: cloud2,
      spawnTime: 6.5,
      x: 75,
      y: 50,
      anchor: "center",
      maxGrowth: 2,
    },
  ];

  // Clouds disappear at 7.5s
  const cloudDisappearTime = 7.5;
  const disappearDuration = 0.5; // 0.5 seconds to fade out

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
    <div className="clouds-section">
      {clouds.map((cloud) => {
        // Only show cloud if video time >= spawn time
        if (videoTime < cloud.spawnTime) return null;

        // Calculate how long this cloud has been visible
        const cloudAge = videoTime - cloud.spawnTime;

        // Clouds grow over time (1.5 seconds to reach max size)
        const growthProgress = Math.min(cloudAge / 1.5, 1);
        const currentScale = 1 + growthProgress * (cloud.maxGrowth - 1);

        // Fade in opacity
        let opacity = Math.min(cloudAge / 0.5, 1);
        let translateY = 0;

        // Move up and fade out when reaching disappear time
        if (videoTime >= cloudDisappearTime) {
          const fadeProgress =
            (videoTime - cloudDisappearTime) / disappearDuration;
          opacity = Math.max(1 - fadeProgress, 0);
          // Move clouds upward (negative Y)
          translateY = -fadeProgress * 100; // Move 100vh up
        }

        // Don't render if fully faded out
        if (opacity <= 0) return null;

        return (
          <div
            key={cloud.id}
            style={{
              position: "absolute",
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              transform: `${getTransform(
                cloud.anchor,
                currentScale
              )} translateY(${translateY}vh)`,
              opacity: opacity,
              pointerEvents: "none",
            }}
          >
            <img
              src={cloud.image}
              alt="cloud"
              className="cloud-full"
              style={{
                position: "relative",
                display: "block",
              }}
            />
            {(cloud.id === 7 || cloud.id === 8) && (
              <div className="cloud-text-overlay">
                {cloud.id === 7 && <span>Welcome To</span>}
                {cloud.id === 8 && <span>Sri Lanka</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CloudsTransition;
