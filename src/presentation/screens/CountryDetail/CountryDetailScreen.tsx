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
import { styles } from './CountryDetailScreen.styles';
import { t } from '../../../i18n';
import VideoPlayer from '../../components/VideoPlayer';
import { useI18n } from '../../../i18n/I18nProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'CountryDetail'>;
type PlayerMode = 'native' | 'custom' | 'both';

const CountryDetailScreen = ({ route }: Props) => {
  const { countryCode } = route.params;
  // 👇 solo para forzar re-render cuando cambia el idioma
  const { language: _language } = useI18n();
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
    return (
      <Text style={styles.centered}>
        {t('common.error')}: {error.message}
      </Text>
    );
  }

  const country = data?.country;
  if (!country) {
    return <Text style={styles.centered}>{t('common.countryNotFound')}</Text>;
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
        {/* Datos del país */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors.onSurface }}>
              {country.name} ({country.code})
            </Text>
            <Text variant="bodyMedium">
              {t('countryDetail.capital')}: {country.capital || 'N/A'}
            </Text>
            <Text variant="bodyMedium">
              {t('countryDetail.continent')}: {country.continent.name}
            </Text>
            <Text variant="bodyMedium">
              {t('countryDetail.currency')}: {country.currency || 'N/A'}
            </Text>
            <Text variant="bodyMedium">
              {t('countryDetail.languages')}:{' '}
              {country.languages.map(l => l.name).join(', ')}
            </Text>
          </Card.Content>
        </Card>

        {/* Reproductores HLS */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.subtitle}>
              {t('countryDetail.hlsTitle')}
            </Text>

            <SegmentedButtons
              value={mode}
              onValueChange={value => setMode(value as PlayerMode)}
              buttons={[
                {
                  value: 'native',
                  label: t('countryDetail.playerLibraryButton'),
                },
                {
                  value: 'custom',
                  label: t('countryDetail.playerCustomButton'),
                },
                {
                  value: 'both',
                  label: t('countryDetail.playerBothButton'),
                },
              ]}
              style={styles.segmented}
            />

            {mode === 'native' && renderNativePlayer()}

            {mode === 'custom' && renderCustomPlayer()}

            {mode === 'both' && (
              <View style={styles.bothContainer}>
                <Text variant="bodySmall" style={styles.playerLabel}>
                  {t('countryDetail.playerLibraryLabel')}
                </Text>
                {renderNativePlayer()}

                <View style={styles.dividerSpace} />

                <Text variant="bodySmall" style={styles.playerLabel}>
                  {t('countryDetail.playerCustomLabel')}
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
