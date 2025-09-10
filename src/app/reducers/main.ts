
// import AppReducer from '@reducers/app/AppReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// import AppApi from './app/AppApi';
import UserApi from './user/UserApi';
import persistConfig from '@config/redux-persist';
import UserReducer from '@reducers/user/UserReducer';

const reducers = combineReducers({
  // [AppReducer.name]: persistReducer(persistConfig.app, AppReducer.reducer),
  [UserReducer.name]: persistReducer(persistConfig.user, UserReducer.reducer),

  // APIsspApi.reducer,
  // [AppApi.reducerPath]: AppApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer
});

export const apiMiddlewares = [
  // AppApi.middleware,
  UserApi.middleware
];

export default reducers;
