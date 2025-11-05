import React, { useState, useMemo, useCallback, useLayoutEffect } from 'react';
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
  IconButton,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { CountriesData, Country } from '../../../types/types';
import { GET_COUNTRIES } from '../../../api/graphQL/queries';
import { styles } from './CountryListScreen.styles';
import { t } from '../../../i18n';
import { useI18n } from '../../../i18n/I18nProvider';
import { filterCountries } from '../../../domain/country/filterCountries';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryList'>;

const CountryListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { loading, error, data } = useQuery<CountriesData>(GET_COUNTRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [continentMenuVisible, setContinentMenuVisible] = useState(false);
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);
  const { language } = useI18n();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('countryList.title'),
      headerRight: () => (
        <IconButton
          icon="cog"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel={t('countryList.settingsButton')}
        />
      ),
    });
  }, [navigation, theme, t]);

  const currencies = useMemo(() => {
    if (!data) return [];
    const allCurrencies = data.countries.map(c => c.currency).filter(Boolean);
    return [...new Set(allCurrencies)].sort();
  }, [data]);

const filteredCountries = useMemo(() => {
  if (!data) return [];
  return filterCountries(
    data.countries,
    searchQuery,
    selectedContinent,
    selectedCurrency,
  );
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
            subtitle={`${t('countryDetail.continent')}: ${item.continent.name} | ${t('countryDetail.currency')}: ${
              item.currency || 'N/A'
            }`}
            titleStyle={{ color: theme.colors.onSurface }}
            subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
          />
        </Card>
      </TouchableOpacity>
    ),
    [handleCountryPress, theme],
  );

  if (loading) return <ActivityIndicator animating style={styles.centered} />;
  if (error) {
    return (
      <Text style={styles.centered}>
        {t('common.error')}: {error.message}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('countryList.searchPlaceholder')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.filterContainer}>
        <Menu
          visible={continentMenuVisible}
          onDismiss={() => setContinentMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setContinentMenuVisible(true)}
              textColor={theme.colors.primary}>
              {selectedContinent || t('countryList.filterByContinent')}
            </Button>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedContinent(null);
              setContinentMenuVisible(false);
            }}
            title={t('countryList.allContinents')}
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
        <Menu
          visible={currencyMenuVisible}
          onDismiss={() => setCurrencyMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setCurrencyMenuVisible(true)}
              textColor={theme.colors.primary}>
              {selectedCurrency || t('countryList.filterByCurrency')}
            </Button>
          }>
          <Menu.Item
            onPress={() => {
              setSelectedCurrency(null);
              setCurrencyMenuVisible(false);
            }}
            title={t('countryList.allCurrencies')}
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
