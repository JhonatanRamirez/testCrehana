import { filterCountries } from "../src/domain/country/filterCountries";
import { Country } from "../src/types/types";

const mockCountries: Country[] = [
    {
        code: 'PE',
        name: 'Peru',
        currency: 'PEN',
        continent: { name: 'South America', code: 'SA' } as any,
    },
    {
        code: 'ES',
        name: 'Spain',
        currency: 'EUR',
        continent: { name: 'Europe', code: 'EU' } as any,

    },
    {
        code: 'FR',
        name: 'France',
        currency: 'EUR',
        continent: { name: 'Europe', code: 'EU' } as any,

    },
];

describe('filterCountries', () => {
    it('returns all countries when there are no filters', () => {
        const result = filterCountries(mockCountries, '', null, null);
        expect(result).toHaveLength(3);
    });

    it('filters by search text (case-insensitive)', () => {
        const result = filterCountries(mockCountries, 'peru', null, null);
        expect(result).toHaveLength(1);
        expect(result[0].code).toBe('PE');
    });

    it('filters by continent', () => {
        const result = filterCountries(mockCountries, '', 'Europe', null);
        expect(result).toHaveLength(2);
        expect(result.map(c => c.code)).toEqual(['ES', 'FR']);
    });

    it('filters by currency', () => {
        const result = filterCountries(mockCountries, '', null, 'EUR');
        expect(result).toHaveLength(2);
    });

    it('combines all filters correctly', () => {
        const result = filterCountries(
            mockCountries,
            'fr',
            'Europe',
            'EUR',
        );
        expect(result).toHaveLength(1);
        expect(result[0].code).toBe('FR');
    });

    it('returns empty array if countries is empty', () => {
        const result = filterCountries([], 'peru', 'Europe', 'EUR');
        expect(result).toEqual([]);
    });
});
