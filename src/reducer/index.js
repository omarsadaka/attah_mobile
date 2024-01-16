import { combineReducers } from 'redux';

import lang from './lang';
import network from './network';
import list from './list';
import location from './location';
import auth from './auth';
import bottomTabs from './bottomTabs';
import chat from './chat';
import shipment from './shipment';

export default combineReducers({
  lang,
  network,
  list,
  location,
  auth,
  bottomTabs,
  chat,
  shipment,
});
