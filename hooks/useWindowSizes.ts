import { useState, useEffect } from "react";

function getWindowSize() {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      domLoaded: false,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    domLoaded: true,
  };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
