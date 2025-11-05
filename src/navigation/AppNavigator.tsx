import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountryListScreen from '../presentation/screens/CountryList/CountryListScreen';
import CountryDetailScreen from '../presentation/screens/CountryDetail/CountryDetailScreen';
import SettingsScreen from '../presentation/screens/Settings/SettingsScreen';


export type RootStackParamList = {
  CountryList: undefined;
  CountryDetail: { countryCode: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CountryList" component={CountryListScreen} options={{ title: 'Countries' }} />
      <Stack.Screen name="CountryDetail" component={CountryDetailScreen} options={{ title: 'Country Details' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
