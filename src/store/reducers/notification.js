import {NOTIFICATION_RECEIVED} from '../../constants/matcher';

const initialState = {
  notificationCount: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_RECEIVED:
      return {
        ...state,
        notificationCount: action.notificationCount,
      };
    default:
      return state;
  }
};
