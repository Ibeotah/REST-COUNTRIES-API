import { useState, useCallback } from "react";
import type { CountryWithBorders } from "../types";
import type { BorderCountry } from "../types";
export const useFetchBorderNames = (url: string) => {
  const [borderNames, setBorderNames] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchBorderNames = useCallback(async (resData: CountryWithBorders[]) => {

    if (resData?.length > 0 && resData[0]?.borders && resData[0].borders.length > 0) {
      const borderCodes = resData[0]?.borders.join(",")
     

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${url}=${borderCodes}`);
          if(!res.ok){
            throw new Error("Failed to fetch border names")
          }
        const data: BorderCountry[] = await res.json()
        console.log(data);
        const mapping: Record<string, string> = {}
        data.forEach((country: BorderCountry) => {
          mapping[country.cca3] = country.name?.common;
        })
        setBorderNames(mapping)
      } 
      catch(error){
        if(error instanceof TypeError){
          setError("Network connection error");
        }
        else if(error instanceof  Error){
          setError(error.message)
        } else {
          setError("Unknown error occurred");
        }
        setBorderNames({});
      }
      finally {
        setIsLoading(false); 
      }
    } else {
      setBorderNames({});
      setError("");
      setIsLoading(false);
    }
  }, [url])


  return { fetchBorderNames, borderNames, isLoading, error }
}