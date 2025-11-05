import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import client from './api/apollo/apolloClient';
import AppNavigator from './navigation/AppNavigator';
import { I18nProvider } from './i18n/I18nProvider';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <PaperProvider>
          <I18nProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </I18nProvider>
        </PaperProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
