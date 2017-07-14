import { combineReducers } from 'redux';

import crime from './crime';
import status from './status';



export default combineReducers({
  crime,
  status
});
