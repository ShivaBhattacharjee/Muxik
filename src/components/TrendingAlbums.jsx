import React, { useRef, useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import { useMusicContext } from "../Context/MusicContext";

const TrendingAlbums = () => {
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsMouseDown(false);
    };

    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const { trendingAlbums } = useMusicContext();
  return (
    <div
      className="flex gap-6 overflow-scroll h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={containerRef}
    >
      {trendingAlbums.map((item, index) => (
        <MusicCard key={index} {...item} />
      ))}
    </div>
  );
};

export default TrendingAlbums;
