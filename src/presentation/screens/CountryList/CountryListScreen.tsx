import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import {
  Searchbar,
  Button,
  Menu,
  Divider,
  ActivityIndicator,
  Text,
  Card,
  useTheme,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { CountriesData, Country } from '../../../types/types';
import { GET_COUNTRIES } from '../../../api/queries';
import { styles } from './CountryListScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryList'>;

const CountryListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [continentMenuVisible, setContinentMenuVisible] = useState(false);
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);

  // 🔹 Obtiene las monedas únicas
  const currencies = useMemo(() => {
    if (!data) return [];
    const allCurrencies = data.countries.map(c => c.currency).filter(Boolean);
    return [...new Set(allCurrencies)].sort();
  }, [data]);

  // 🔹 Filtra los países según búsqueda y filtros
  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return data.countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = !selectedContinent || country.continent.name === selectedContinent;
      const matchesCurrency = !selectedCurrency || country.currency === selectedCurrency;
      return matchesSearch && matchesContinent && matchesCurrency;
    });
  }, [data, searchQuery, selectedContinent, selectedCurrency]);

  const handleCountryPress = useCallback(
    (code: string) => navigation.navigate('CountryDetail', { countryCode: code }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Country }) => (
      <TouchableOpacity onPress={() => handleCountryPress(item.code)}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title={`${item.name} (${item.code})`}
            subtitle={`Continent: ${item.continent.name} | Currency: ${item.currency || 'N/A'}`}
            titleStyle={{ color: theme.colors.onSurface }}
            subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
          />
        </Card>
      </TouchableOpacity>
    ),
    [handleCountryPress, theme],
  );

  if (loading) return <ActivityIndicator animating style={styles.centered} />;
  if (error) return <Text style={styles.centered}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {/* 🔍 Barra de búsqueda */}
      <Searchbar
        placeholder="Search for a country..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {/* 🔽 Filtros */}
      <View style={styles.filterContainer}>
        {/* Filtro por continente */}
        <Menu
          visible={continentMenuVisible}
          onDismiss={() => setContinentMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setContinentMenuVisible(true)}
              textColor={theme.colors.primary}>
              {selectedContinent || 'Filter by Continent'}
            </Button>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedContinent(null);
              setContinentMenuVisible(false);
            }}
            title="All Continents"
          />
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

        {/* Filtro por moneda */}
        <Menu
          visible={currencyMenuVisible}
          onDismiss={() => setCurrencyMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setCurrencyMenuVisible(true)}
              textColor={theme.colors.primary}>
              {selectedCurrency || 'Filter by Currency'}
            </Button>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedCurrency(null);
              setCurrencyMenuVisible(false);
            }}
            title="All Currencies"
          />
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

      {/* 📋 Lista de países */}
      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CountryListScreen;
