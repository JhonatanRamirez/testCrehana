import React, { useEffect } from 'react';
import { View } from 'react-native';
import { RadioButton, Text, Button, Card, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { styles } from './SettingsScreen.styles';
import { t } from '../../../i18n';
import { useI18n } from '../../../i18n/I18nProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { language, changeLanguage } = useI18n();

  useEffect(() => {
    navigation.setOptions({ title: t('settings.title') });
  }, [language, navigation]);

  const handleLanguageChange = (value: string) => {
    if (value === 'en' || value === 'es') {
      changeLanguage(value);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {t('settings.language')}
          </Text>

          <RadioButton.Group
            onValueChange={handleLanguageChange}
            value={language}
          >
            <View style={styles.option}>
              <RadioButton value="en" />
              <Text>{t('settings.english')}</Text>
            </View>
            <View style={styles.option}>
              <RadioButton value="es" />
              <Text>{t('settings.spanish')}</Text>
            </View>
          </RadioButton.Group>

          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            {t('settings.back')}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default SettingsScreen;
