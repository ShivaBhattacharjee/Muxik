import React,{useRef,useState,useEffect} from "react";
import { MusicCard, SinglesongCard, SingleChart } from "../components";
import { useMusicContext } from "../Context/MusicContext";

const Albums = () => {
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
  const { albums } = useMusicContext();
  return (
    <div className="flex gap-6 overflow-scroll h-full"    
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    ref={containerRef}>
      {albums.map((item, index) => {
        if (item.type === "song") {
          return <SinglesongCard key={index} {...item} />;
        }
        if (item.type === "playlist") {
          return <SingleChart key={index} {...item} />;
        }
        if (item.type === "album") {
          return <MusicCard key={index} {...item} />;
        }
      })}
    </div>
  );
};

export default Albums;
