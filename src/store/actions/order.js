/* eslint-disable no-alert */

import {ROUTES} from '../../constants';
import {DELIVER_DETAIL_RESPONSE_DATA} from '../../constants/matcher';
import {RestClientApi} from '../../network/RestClient';

export const getOrderDetails = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await RestClientApi.getOrderDetails(token, id).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: DELIVER_DETAIL_RESPONSE_DATA,
          deliverDetailsResponseData: response.data,
        });
      } else {
        console.log(response.message);
      }
    });
  };
};

export const postOrderStatus = (id, status, navigation) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await RestClientApi.postOrderStatus(id, status, token).then(response => {
      console.log(response);
      if (response.status === 200) {
        if (status === 'Accepted') {
          navigation.replace(ROUTES.DASHBOARD);
        } else if (status === 'Dispatched') {
          navigation.replace(ROUTES.DISPATCHED, {id: id});
        } else {
          navigation.replace(ROUTES.DASHBOARD);
        }
      } else {
        console.log(response.message);
      }
    });
  };
};
