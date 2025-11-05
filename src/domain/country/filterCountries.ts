import { Country } from '../../types/types';

export const filterCountries = (
  countries: Country[],
  search: string,
  continent: string | null,
  currency: string | null,
): Country[] => {
  if (!countries || countries.length === 0) {
    return [];
  }

  const normalizedSearch = search.trim().toLowerCase();

  return countries.filter(country => {
    const matchesSearch =
      !normalizedSearch ||
      country.name.toLowerCase().includes(normalizedSearch);

    const matchesContinent =
      !continent || country.continent.name === continent;

    const matchesCurrency =
      !currency || country.currency === currency;

    return matchesSearch && matchesContinent && matchesCurrency;
  });
};
