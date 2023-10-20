/* eslint-disable no-alert */

import {
  COMPLETED_DELIVER_RESPONSE_DATA,
  NEW_DELIVER_RESPONSE_DATA,
} from '../../constants/matcher';
import {RestClientApi} from '../../network/RestClient';

export const getNewDelivers = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await RestClientApi.getNewDelivers(token).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: NEW_DELIVER_RESPONSE_DATA,
          newDeliverResponseData: response.data,
        });
      } else {
        console.log(response.message);
      }
    });
  };
};

export const getCompletedDelivers = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await RestClientApi.getCompletedDelivers(token).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: COMPLETED_DELIVER_RESPONSE_DATA,
          completedDeliverResponseData: response.data,
        });
      } else {
        console.log(response.message);
      }
    });
  };
};
