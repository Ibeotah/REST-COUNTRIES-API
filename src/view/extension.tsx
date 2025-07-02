import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { Container } from "../components/container/container";
import { Input } from "../components/input/input";
import styles from "../styles/extension.module.css";
import search_icon from "../assets/searchIcon/searchIcon.svg";
import { Select } from "../components/select/select";

import { Loader } from "../components/loader/loader";
import { Alert } from "../components/alert/alert";
import { Pagination } from "../components/pagination/pagination";
import type { InputRef } from "antd";
import { baseUrl, 
  searchTrimUrl, searchByName 
} from "../contact/contact";

// import { absolutePaths} from "../routing/paths";
import { useFetchCountries } from "../hooks/useFetchCountries";
import type { CountryDetail } from "../types";
import { usePageSize } from "../hooks/usePageSize";
export const Extension = () => {
  
  const {data, isLoading, error, fetchCountries} = useFetchCountries<CountryDetail>();
  // console.log(data)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [search, setSearch] = useState("");
  const inputRef = useRef<InputRef>(null);
  const pageSize = usePageSize()
  
  useEffect(() => {
   fetchCountries(baseUrl)
        
  }, []);

  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim() === "") {
          fetchCountries(searchTrimUrl)
        return;
      };

      const formattedSearch =
        search.trim().charAt(0).toUpperCase() +
        search.trim().slice(1).toLowerCase();

      
      fetchCountries(`${searchByName}/${formattedSearch}?fields=name,flags,population,region,capital`);

    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(function () {
    function callback(e: KeyboardEvent) {
      if (document.activeElement === inputRef.current?.input) return;
      if (e.code === "Enter" && inputRef.current?.input) {
        inputRef.current?.input.focus();
        setSearch("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [])

  const options = [
    ...new Set(
      data.map(({ region}) => {
        return region;
      })
    ),
  ].map((region) => {
    return {
      label: <div className={styles.regionLabel}>{region}</div>,
      value: region,
    };
  });
  const filteredData = selectedRegion
    ? data.filter((item) => item.region === selectedRegion)
    : data;
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);
  return (
    <Container isNav={false}
    className={`${styles.container} ${isLoading || error ? styles.loadingHeight: ""}`}
    >
      <Container isNav={false} className={styles.input_container}>
        <Input
          placeholder="Search for a country..."
          className={styles.input}
          prefix={
            <img src={search_icon} alt="Search" className={styles.prefix} />
          }
          value={search}
         
          onChange={(e) => setSearch(e.target.value)
            

          }
          ref={inputRef}
        />
       
        <Container className={styles.filter_select_container}>
        <div className={styles.filteredData}> {filteredData.length} Items</div>
        <Select
          className={styles.select}
          placeholder={
            <div className={styles.placeholder}>Filter by Region</div>
          }
          options={options}
          onChange={(value) => {
            setSelectedRegion(value ?? "");
            setCurrentPage(1);
          }}
          allowClear
        />
        </Container>
      </Container>
      {isLoading && <Loader className={styles.loader} />}
      {error && <Alert message={error} />}
      
      {!isLoading && !error && (
        <>
          <Container isNav={false} className={styles.parent_card}>
            {currentData.map((obj) => {
        const {name, flags, population, region, capital}  = obj
            
       return  <NavLink 
        to={`${name?.common}`}
        className={styles.navlink}  key={flags?.svg}>
              <div className={styles.card}
               >
                <img
                  src={flags?.svg}
                  alt={`This is the flag of ${name?.common}`}
                  className={styles.flag}
                />

                <div className={styles.card_contents}>
                  <div className={styles.contents_child}>
                    <div className={styles.country}>{name?.common}</div>
                    <Container className={styles.other_contents}>
                      <div className={styles.population}>
                        Population:{" "}
                        <span className={styles.pop}>
                          {" "}
                          {population?.toLocaleString() ?? "Not available"}
                        </span>
                      </div>
                      <div className={styles.region}>
                        Region:{" "}
                        <span className={styles.reg}>
                          {" "}
                          {region ?? "Not available"}
                        </span>
                      </div>
                      <div className={styles.capital}>
                        Capital:{" "}
                        <span className={styles.cap}>
                          {" "}
                          {capital?.[0] ?? "Not available"}
                        </span>
                      </div>
                    </Container>
                  </div>
                </div>
              </div>
               </NavLink>
})}
            
          </Container>
         
          <Pagination
            total={filteredData.length}
            pageSize={pageSize}
            defaultCurrent={1}
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
           showSizeChanger={false}
            className={styles.pagination}
          />
        </>
      )}
    </Container>
  );
};
