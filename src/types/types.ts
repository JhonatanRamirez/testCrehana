export interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
  currency: string;
}

export interface Continent {
  name: string;
}

export interface CountriesData {
  countries: Country[];
  continents: Continent[];
}

export interface Language {
  name: string;
}

export interface CountryDetails {
  code: string;
  name: string;
  currency: string;
  continent: {
    name: string;
  };
  languages: Language[];
  capital: string;
}

export interface CountryDetailsData {
  country: CountryDetails;
}
