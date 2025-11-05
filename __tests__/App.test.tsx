/**
 * @format
 */

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

jest.mock('../src/api/apollo', () => ({
  __esModule: true,
  default: {},
}));

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
});
