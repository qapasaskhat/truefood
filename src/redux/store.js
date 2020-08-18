import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {createBlacklistFilter} from 'redux-persist-transform-filter';
import AsyncStorage from '@react-native-community/async-storage';

import {appReducer} from '../reducres/appReducer';

const saveSubsetBlacklistFilter = createBlacklistFilter('', []);

const config = {
  key: 'primary',
  storage: AsyncStorage,
  transform: [saveSubsetBlacklistFilter],
  //blacklist: ['appReducer'],
  timeout: 0,
};

const reducer = persistCombineReducers(config, {
  appReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    AsyncStorage.clear();
    state = undefined;
  }

  return reducer(state, action);
};
let store = compose(applyMiddleware(thunk, logger))(createStore)(rootReducer);

persistStore(store, () => {});

export default store;
