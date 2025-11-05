import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Video from 'react-native-video';
import { GET_COUNTRY_DETAILS } from '../api/queries';
import { CountryDetailsData } from '../types/types';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetail'>;

const CountryDetailScreen = ({ route }: Props) => {
  const { countryCode } = route.params;
  const { loading, error, data } = useQuery<CountryDetailsData>(GET_COUNTRY_DETAILS, {
    variables: { code: countryCode },
  });

  if (loading) return <ActivityIndicator animating={true} style={styles.centered} />;
  if (error) return <Text style={styles.centered}>Error: {error.message}</Text>;

  const country = data?.country;

  if (!country) return <Text style={styles.centered}>Country not found.</Text>;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>


          <Text variant="titleLarge">
            {country.name} ({country.code})
          </Text>

          <Text variant="bodyMedium">
            Capital: {country.capital || 'N/A'}
          </Text>

          <Text variant="bodyMedium">
            Continent: {country.continent.name}
          </Text>

          <Text variant="bodyMedium">
            Currency: {country.currency || 'N/A'}
          </Text>

          <Text variant="bodyMedium">
            Languages: {country.languages.map(lang => lang.name).join(', ')}
          </Text>

        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>

          <Text variant="titleMedium">HLS Video Stream</Text>
   <Video
            source={{ uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
          />
      
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 4,
  },
  video: {
    width: '100%',
    height: 200,
  },
});

export default CountryDetailScreen;
