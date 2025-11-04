import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import client from './api/apollo/apolloClient';
import AppNavigator from './navigation/AppNavigator';

function App(): React.JSX.Element {
  console.log("levanto")
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

export default App;
