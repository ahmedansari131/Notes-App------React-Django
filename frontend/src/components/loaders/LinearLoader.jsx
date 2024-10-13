import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const LinearLoader = () => {
  const loaderRef = useRef(null);
  const loaderStripRef = useRef([]);
  const [stripPosition, setStripPosition] = useState(0);
  const [totalStrip, setTotalStrip] = useState([]);

  useLayoutEffect(() => {
    const loaderStrips = [];
    const loader = loaderRef.current;
    const gap = 5;
    if (loader) {
      const { width: loaderWidth } = loader.getBoundingClientRect();
      const loaderStripWidth =
        loaderStripRef.current[0]?.getBoundingClientRect().width || 0;
      setStripPosition(Math.floor(loaderStripWidth + gap));
      const stripCount = Math.floor(loaderWidth / (loaderStripWidth + gap));
      for (let index = 0; index <= stripCount; index++) {
        loaderStrips.push(index);
      }
      setTotalStrip(loaderStrips);
    }
  }, [stripPosition]);

  return (
    <div
      ref={loaderRef}
      className="w-screen bg-slate-600 h-3 relative overflow-hidden border-t border-slate-500 border-b"
    >
      {totalStrip.map((_, index) => (
        <div
          style={{ left: `${stripPosition * index}px` }}
          key={index}
          ref={(elem) => (loaderStripRef.current[index] = elem)}
          className={`absolute top-0 h-full bg-slate-800 w-10 rotate-45`}
        ></div>
      ))}
    </div>
  );
};

export default LinearLoader;
