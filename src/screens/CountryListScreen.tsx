import React, { useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { Searchbar, Button, Menu, Divider, ActivityIndicator, Text, Card } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GET_COUNTRIES } from '../api/graphql/queries';
import { CountriesData, Country } from '../types/types';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryList'>;

const CountryListScreen = ({ navigation }: Props) => {
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const [continentMenuVisible, setContinentMenuVisible] = useState(false);
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);

  console.log("lo que sea")
  const currencies = useMemo(() => {
    if (!data) return [];
    const allCurrencies = data.countries.map(c => c.currency).filter(Boolean);
    return [...new Set(allCurrencies)].sort();
  }, [data]);

  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return data.countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = !selectedContinent || country.continent.name === selectedContinent;
      const matchesCurrency = !selectedCurrency || country.currency === selectedCurrency;
      return matchesSearch && matchesContinent && matchesCurrency;
    });
  }, [data, searchQuery, selectedContinent, selectedCurrency]);

  if (loading) return <ActivityIndicator animating={true} style={styles.centered} />;
  if (error) return <Text style={styles.centered}>Error: {error.message}</Text>;

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CountryDetail', { countryCode: item.code })}>
      <Card style={styles.card}>
        <Card.Title title={`${item.name} (${item.code})`} subtitle={`Continent: ${item.continent.name} | Currency: ${item.currency || 'N/A'}`} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a country..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.filterContainer}>
        <Menu
          visible={continentMenuVisible}
          onDismiss={() => setContinentMenuVisible(false)}
          anchor={<Button onPress={() => setContinentMenuVisible(true)}>{selectedContinent || 'Filter by Continent'}</Button>}>
          <Menu.Item onPress={() => { setSelectedContinent(null); setContinentMenuVisible(false); }} title="All Continents" />
          <Divider />
          {data?.continents.map(continent => (
            <Menu.Item
              key={continent.name}
              onPress={() => {
                setSelectedContinent(continent.name);
                setContinentMenuVisible(false);
              }}
              title={continent.name}
            />
          ))}
        </Menu>
        <Menu
          visible={currencyMenuVisible}
          onDismiss={() => setCurrencyMenuVisible(false)}
          anchor={<Button onPress={() => setCurrencyMenuVisible(true)}>{selectedCurrency || 'Filter by Currency'}</Button>}>
           <Menu.Item onPress={() => { setSelectedCurrency(null); setCurrencyMenuVisible(false); }} title="All Currencies" />
          <Divider />
          {currencies.map(currency => (
            <Menu.Item
              key={currency}
              onPress={() => {
                setSelectedCurrency(currency);
                setCurrencyMenuVisible(false);
              }}
              title={currency}
            />
          ))}
        </Menu>
      </View>
      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    margin: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  list: {
    paddingHorizontal: 8,
  },
  card: {
    marginVertical: 4,
  },
});

export default CountryListScreen;
