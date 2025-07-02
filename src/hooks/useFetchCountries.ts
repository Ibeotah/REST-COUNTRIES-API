

import { useState, useCallback } from "react";

export const useFetchCountries = <T = unknown>() => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

 
  const fetchCountries = useCallback(async (url: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Country Not Found");
      
      const resData: T[] = await res.json();
      setData(resData);
    } 
    catch(error){
        if(error instanceof TypeError){
          setError("Please check your internet connection.");
        }
        else if(error instanceof  Error){
          setError(error.message)
        } else {
          setError("Unknown error occurred");
        }
        }
    finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchCountries };
};
