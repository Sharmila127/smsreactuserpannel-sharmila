// components/common/SwipeToPay.tsx
import React, { useRef, useState } from "react";

interface SwipeToPayProps {
  onSwipeComplete: () => void;
}

const SwipeToPay: React.FC<SwipeToPayProps> = ({ onSwipeComplete }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => {
    setDragging(false);
    const trackWidth = trackRef.current?.offsetWidth || 0;
    const buttonWidth = buttonRef.current?.offsetWidth || 0;

    if (offsetX + buttonWidth >= trackWidth - 10) {
      onSwipeComplete();
      setOffsetX(trackWidth - buttonWidth);
    } else {
      setOffsetX(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const track = trackRef.current;
    if (track) {
      const newX = e.clientX - track.getBoundingClientRect().left;
      const max = track.offsetWidth - (buttonRef.current?.offsetWidth || 0);
      setOffsetX(Math.min(Math.max(0, newX), max));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const track = trackRef.current;
    if (track) {
      const touchX = e.touches[0].clientX;
      const newX = touchX - track.getBoundingClientRect().left;
      const max = track.offsetWidth - (buttonRef.current?.offsetWidth || 0);
      setOffsetX(Math.min(Math.max(0, newX), max));
    }
  };

  return (
    <div
      className="mt-6 select-none"
      ref={trackRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className="text-center text-gray-500 mb-1">Swipe to Place order</div>
      <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          ref={buttonRef}
          className="absolute top-0 left-0 h-12 w-12 rounded-full bg-[#9b111e] text-white flex items-center justify-center shadow-lg transition-all"
          style={{ transform: `translateX(${offsetX}px)` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setDragging(true)}
        >
          ➤
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm pointer-events-none">
          Swipe right to confirm Place Order →
        </div>
      </div>
    </div>
  );
};

export default SwipeToPay;
