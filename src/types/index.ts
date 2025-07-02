import * as React from "react";

export type Routes = {
  path: string;
  component: () => React.JSX.Element
}[];
export type CountryDetail = {
  name: { common: string };
  area: number;
  timezones: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  flags: { svg: string };
  population:number;
  region: string;
  capital: string[]
};
export type Detail = {
  name: { official: string };
  area: number;
  timezones: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  subregion: string;
  languages:string[];
  maps: {
    googleMaps: string
  }
  borders?: string[];
};
export type CountryWithBorders = {
  borders?: string[];
}

export type BorderCountry = {
  cca3: string;
  name: {
    common: string;
  };
}

