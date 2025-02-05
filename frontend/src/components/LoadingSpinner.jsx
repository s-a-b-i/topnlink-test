import React, { useState, useEffect } from 'react';

const Loader = () => {
  const fullText = "Linkntop"; // Text for the loader
  const [displayText, setDisplayText] = useState(fullText);
  const [removing, setRemoving] = useState(true);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        if (removing) {
          // Remove letters one by one from the end
          if (prevText.length > 0) {
            return prevText.slice(0, -1);
          } else {
            setRemoving(false);
            setShowDots(true); // Show dots when text is fully removed
            return "";
          }
        } else {
          // Add letters back one by one from the start
          if (prevText.length < fullText.length) {
            if (showDots) {
              setShowDots(false); // Hide dots when text starts reappearing
            }
            return fullText.slice(0, prevText.length + 1);
          } else {
            setRemoving(true); // Start the process again
            return fullText;
          }
        }
      });
    }, 150); // Faster speed for smoother animation

    return () => clearInterval(interval);
  }, [removing, showDots]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        {/* Animated Text */}
        <div className="text-3xl font-bold text-white">
          {displayText || (showDots ? "..." : "_")}
        </div>

        {/* Bottom Line Decoration */}
        <div className="w-32 h-1 bg-white animate-shimmer rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;