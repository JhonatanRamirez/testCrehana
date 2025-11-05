import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { Provider as PaperProvider } from 'react-native-paper';

import { I18nProvider } from '../src/i18n/I18nProvider';
import CountryListScreen from '../src/presentation/screens/CountryList/CountryListScreen';
import { GET_COUNTRIES } from '../src/api/graphQL/queries';

const mockData = {
  countries: [
    {
      code: 'PE',
      name: 'Peru',
      capital: 'Lima',
      currency: 'PEN',
      continent: { name: 'South America', code: 'SA' },
      languages: [],
    },
    {
      code: 'ES',
      name: 'Spain',
      capital: 'Madrid',
      currency: 'EUR',
      continent: { name: 'Europe', code: 'EU' },
      languages: [],
    },
  ],
  continents: [
    { code: 'SA', name: 'South America', countries: [] },
    { code: 'EU', name: 'Europe', countries: [] },
  ],
};

const mocks = [
  {
    request: { query: GET_COUNTRIES },
    result: { data: mockData },
  },
];

const renderScreen = () => {
  const navigation: any = { navigate: jest.fn(), setOptions: jest.fn() };
  const route: any = { key: 'CountryList', name: 'CountryList' };

  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PaperProvider>
        <I18nProvider>
          <CountryListScreen navigation={navigation} route={route} />
        </I18nProvider>
      </PaperProvider>
    </MockedProvider>,
  );

  return { ...utils, navigation };
};

describe('CountryListScreen', () => {
  it('renders countries after loading', async () => {
    const { getByText } = renderScreen();

    await waitFor(() => {
      expect(getByText(/Peru/i)).toBeTruthy();
      expect(getByText(/Spain/i)).toBeTruthy();
    });
  });

it('filters countries using the search bar', async () => {
  const { getByPlaceholderText, queryByText } = renderScreen();

  await waitFor(() => {
    expect(queryByText(/Peru/i)).toBeTruthy();
    expect(queryByText(/Spain/i)).toBeTruthy();
  });


  const input = getByPlaceholderText(/Search for a country|Buscar un país/i);

  fireEvent.changeText(input, 'Peru');
  await waitFor(() => {
    expect(queryByText(/Peru/i)).toBeTruthy();
    expect(queryByText(/Spain/i)).toBeNull();
  });
});


});
