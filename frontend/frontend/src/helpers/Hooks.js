import { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerHeight: height } = window;
    return height;
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
    
      return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowDimensions;
}