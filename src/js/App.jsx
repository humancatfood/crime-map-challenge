import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';

import Map from './components/map';



export default () => (
  <ReduxProvider store={ configureStore() } >
    <Map/>
  </ReduxProvider>
);
