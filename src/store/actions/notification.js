import {NOTIFICATION_RECEIVED} from '../../constants/matcher';

export const receiveNotification = count => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_RECEIVED,
      notificationCount: count,
    });
  };
};
