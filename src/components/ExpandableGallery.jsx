import { useState, useEffect } from 'react';

export const ExpandableGallery = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    setSupportsHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  if (images.length === 1) {
    return (
      <div className="aspect-video rounded-sm overflow-hidden group bg-gray-100 dark:bg-gray-800">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover object-top scale-125 transition-transform duration-500 ease-out group-hover:scale-100 group-active:scale-100"
        />
      </div>
    );
  }

  return (
    <div className="flex gap-2 md:gap-3 h-56 sm:h-64 md:h-80 rounded-sm overflow-hidden">
      {images.map((img, idx) => {
        const isActive = activeIndex === idx;
        const isInactive = activeIndex !== null && !isActive;

        return (
          <div
            key={idx}
            onMouseEnter={supportsHover ? () => setActiveIndex(idx) : undefined}
            onMouseLeave={supportsHover ? () => setActiveIndex(null) : undefined}
            onClick={!supportsHover ? () => setActiveIndex(isActive ? null : idx) : undefined}
            className={`relative overflow-hidden rounded-sm cursor-pointer bg-gray-100 dark:bg-gray-800 transition-all duration-500 ease-out ${
              isActive ? 'flex-[4]' : isInactive ? 'flex-[0.5]' : 'flex-1'
            }`}
          >
            <img
              src={img}
              alt={`${title} screenshot ${idx + 1}`}
              className={`w-full h-full transition-all duration-500 ease-out ${
                isActive ? 'object-contain scale-100' : 'object-cover object-top scale-125'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
