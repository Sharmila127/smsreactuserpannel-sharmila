import React, { useRef } from 'react';

interface ScrollableNavbarProps {
  items: string[];
}

const ScrollableNavbar: React.FC<ScrollableNavbarProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF3EB] py-3 px-4 shadow-md w-full flex items-center gap-2 cursor-default">
      <button
        onClick={scrollLeft}
        className="text-xl font-bold "
      >
        &lt;
      </button>
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-max px-4 py-2 text-base font-semibold text-gray-800 "
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="text-xl font-bold "
      >
        &gt;
      </button>
    </div>
  );
};

export default ScrollableNavbar;
