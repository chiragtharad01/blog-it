import { useEffect, useState } from "react";

export const useTableWidths = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    title: width * 0.35,
    category: width * 0.25,
    publishedAt: width * 0.2,
    status: width * 0.1,
    action: width * 0.1,
  };
};
