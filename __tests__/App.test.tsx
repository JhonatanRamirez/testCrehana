import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

it('renders App without crashing', () => {
  renderer.create(<App />);
});
