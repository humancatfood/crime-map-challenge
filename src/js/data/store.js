import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';



export default () => {

  const middleWare = [
    thunk
  ];

  if (ENV.DEBUG)
  {
    window.console.debug("creating logger");
    middleWare.push(createLogger());
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middleWare)
  );

  return store;

};


