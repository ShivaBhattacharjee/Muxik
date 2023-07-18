import React,{useRef,useEffect,useState} from "react";
import { ChartsDisplay } from "../components";
import { useMusicContext } from "../Context/MusicContext";

const TopCharts = () => {
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
  const { charts } = useMusicContext();
  return (
    <div className="flex flex-col gap-8 max-md:gap-3 overflow-scroll h-full text-white lg:grid-cols-3 md:grid md:grid-cols-2"
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    ref={containerRef}>
      {charts.map((item, index) => {
        return <ChartsDisplay {...item} key={index} />;
      })}
    </div>
  );
};

export default TopCharts;
