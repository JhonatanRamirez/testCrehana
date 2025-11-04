import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';

export type RootStackParamList = {
  CountryList: undefined;
  CountryDetail: { countryCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CountryList" component={CountryListScreen} options={{ title: 'Countries' }} />
      <Stack.Screen name="CountryDetail" component={CountryDetailScreen} options={{ title: 'Country Details' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
