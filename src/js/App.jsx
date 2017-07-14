import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import configureStore from './data/store';

import Map from './components/map';
import Spinner from './components/spinner';
import Messages from './components/messages';



export default () => (
  <ReduxProvider store={ configureStore() } >
    <div id="layout">
      <Map/>
      <Spinner/>
      <Messages/>
    </div>
  </ReduxProvider>
);
