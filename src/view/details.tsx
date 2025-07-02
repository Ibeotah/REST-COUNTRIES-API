import { useEffect } from "react";
import { useFetchCountries } from "../hooks/useFetchCountries";
import styles from "../styles/details.module.css";
import {  searchByName,fetchBorderDetails, } from "../contact/contact";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { absolutePaths } from "../routing/paths";
import { useFetchBorderNames } from "../hooks/useFetchBorderNames";
import type { Detail } from "../types";
import { Container } from "../components/container/container";
import { Loader } from "../components/loader/loader";
import { Alert } from "../components/alert/alert";
type Currency = {
  name: string;
  symbol: string;
};


export const Details = () => {
  const params = useParams()

const {name} = params;

  const {data, isLoading, error, fetchCountries} = useFetchCountries<Detail>();
  console.log(data,isLoading,error)
  

  useEffect(() => {
  if (name) {
    const url = `${searchByName}/${encodeURIComponent(name)}?fullText=true`;
    fetchCountries(url);
  }
}, [name, fetchCountries]);
const {fetchBorderNames, borderNames, isLoading:isBorderLoading, error:borderError} = useFetchBorderNames(fetchBorderDetails)
useEffect(() => {
  if(data?.length > 0 ){
    fetchBorderNames(data)
  }
}, [data, fetchBorderNames])



  
 return (
  <>
 {isLoading && <Container className={styles.loader_container}><Loader className={styles.loader}/></Container>}
  {
    error && <Container className={styles.alert_container}><Alert message={error} type="error"/></Container>
  }
     {!isLoading && !error &&
    (<Container className={styles.detailContent}>
      {
        data.map(({name, subregion, languages, currencies, timezones, area, maps}) => (
         
          <div key={name?.official}>
         
          <h2>{name?.official}</h2>
   <p><strong>Subregion:</strong> {subregion ?? "Not Available"}</p>
   <p><strong>Languages:</strong> {Object.values(languages).join(",")}</p>
   <p><strong>Currencies:</strong> {
  currencies
    ? Object.values(currencies)
        .map((currency: Currency) => `${currency.name} (${currency.symbol})`)
        .join(", ")
    : "Not Available"
}</p>
   <p><strong>Timezones:</strong> {timezones.join(", ")}</p>
   <p><strong>Area:</strong> {area.toLocaleString()} km²</p> 

    <p>
  <strong>Borders:</strong>{" "}
  { isBorderLoading && <Loader className={styles.borderLoader} /> }
  {borderError && <Alert message={borderError} border={true} className={styles.borderError}/>}
  {!isBorderLoading && !borderError && (
  Object.values(borderNames).length > 0
    ? Object.values(borderNames).map((border, index, array) => (
        <NavLink
          key={border}
          to={absolutePaths.getDetail(border)}
          style={{ textDecoration: "none" }}
        >
          <span>{border}{index < array.length - 1 ? ", " : ""}</span>
        </NavLink>
      ))
    : "Not Available"
)}
</p>

    <p><strong>Map:</strong> <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer">View Map {name?.official}</a></p>
            </div>
        ))
      }
    
    
  </Container>)}
  </>
  );
};