import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import {
  ActivityIndicator,
  Card,
  Text,
  SegmentedButtons,
  useTheme,
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Video from 'react-native-video';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { CountryDetailsData } from '../../../types/types';
import { GET_COUNTRY_DETAILS } from '../../../api/queries';
import VideoPlayer from '../../components/VideoPlayer';
import { styles } from './CountryDetailScreen.styles';


type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetail'>;

type PlayerMode = 'native' | 'custom' | 'both';

const CountryDetailScreen = ({ route }: Props) => {
  const { countryCode } = route.params;
  const theme = useTheme();

  const { loading, error, data } = useQuery<CountryDetailsData>(
    GET_COUNTRY_DETAILS,
    { variables: { code: countryCode } },
  );

  const [mode, setMode] = useState<PlayerMode>('native');

  if (loading) {
    return <ActivityIndicator animating style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>Error: {error.message}</Text>;
  }

  const country = data?.country;
  if (!country) {
    return <Text style={styles.centered}>Country not found.</Text>;
  }

  const videoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  const renderNativePlayer = () => (
    <Video
      source={{ uri: videoUrl }}
      style={styles.video}
      controls
      resizeMode="contain"
    />
  );

  const renderCustomPlayer = () => (
    <VideoPlayer source={videoUrl} style={styles.video} />
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              {country.name} ({country.code})
            </Text>
            <Text variant="bodyMedium">Capital: {country.capital || 'N/A'}</Text>
            <Text variant="bodyMedium">Continent: {country.continent.name}</Text>
            <Text variant="bodyMedium">Currency: {country.currency || 'N/A'}</Text>
            <Text variant="bodyMedium">
              Languages: {country.languages.map((l) => l.name).join(', ')}
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.subtitle}>
              HLS Video Stream
            </Text>

            <SegmentedButtons
              value={mode}
              onValueChange={(value) => setMode(value as PlayerMode)}
              buttons={[
                { value: 'native', label: 'Reproductor librería' },
                { value: 'custom', label: 'Reproductor custom' },
                { value: 'both', label: 'Ambos' },
              ]}
              style={styles.segmented}
            />

            {mode === 'native' && renderNativePlayer()}
            {mode === 'custom' && renderCustomPlayer()}

            {mode === 'both' && (
              <View style={styles.bothContainer}>
                <Text variant="bodySmall" style={styles.playerLabel}>
                  Reproductor librería (react-native-video)
                </Text>
                {renderNativePlayer()}

                <View style={styles.dividerSpace} />

                <Text variant="bodySmall" style={styles.playerLabel}>
                  Reproductor custom (WebView + hls.js)
                </Text>
                {renderCustomPlayer()}
              </View>
            )}
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default CountryDetailScreen;
