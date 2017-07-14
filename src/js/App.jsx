import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';



export default () => (
  <ReduxProvider store={ configureStore() } >
    <h1>App</h1>
  </ReduxProvider>
);
