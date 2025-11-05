import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      languageCode: 'en',
      countryCode: 'US',
      languageTag: 'en-US',
      isRTL: false,
    },
  ],
}));

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  const MockWebView = (props) => <View {...props} />;

  return {
    __esModule: true,
    default: MockWebView,
    WebView: MockWebView,
  };
});
jest.mock('react-native-paper/src/components/MaterialCommunityIcon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return (props: any) => <Text>{props.name || 'icon'}</Text>;
});
