/* eslint-disable no-alert */

import {PROFILE_RESPONSE_DATA} from '../../constants/matcher';
import {RestClientApi} from '../../network/RestClient';

export const getProfileDetail = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await RestClientApi.getProfileDetails(token).then(response => {
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: PROFILE_RESPONSE_DATA,
          profileResponseData: response.data,
        });
      } else {
        console.log(response.message);
      }
    });
  };
};
