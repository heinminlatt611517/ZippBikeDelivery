/* eslint-disable no-alert */

import {ROUTES} from '../../constants';
import {AUTHENTICATE, KEY_AUTH_TOKEN} from '../../constants/matcher';
import {RestClientApi} from '../../network/RestClient';
import {storeData} from '../../utils/SessionManager';

export const login = (email, password, navigation) => {
  return async (dispatch, getState) => {
    await RestClientApi.login(email, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: AUTHENTICATE,
          token: response.data.token,
        });
        storeData(KEY_AUTH_TOKEN, response.data.token);
        navigation.replace(ROUTES.DASHBOARD);
      } else {
        alert(response.message);
      }
    });
  };
};

export const setAuthToken = token => {
  console.log('AuthToken', token);
  return dispatch => {
    dispatch({
      type: AUTHENTICATE,
      token: token,
    });
  };
};
