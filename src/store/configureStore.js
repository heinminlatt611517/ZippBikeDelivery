import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import homeReducer from './reducers/home';
import orderReducer from './reducers/order';
import notificationReducer from './reducers/notification';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  order: orderReducer,
  notification: notificationReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};

export default configureStore;
