import { 
    useEffect,
     useState } from "react";

export const usePageSize = () => {
    const getPageSize = (width: number) => {
    return width >=1400 || width < 1200 ? 8:9
  }
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));
  

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
};
