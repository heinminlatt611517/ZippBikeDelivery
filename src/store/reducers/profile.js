import {PROFILE_RESPONSE_DATA} from '../../constants/matcher';

const initialState = {
  profileDetailData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_RESPONSE_DATA:
      return {
        ...state,
        profileDetailData: action.profileResponseData,
      };
    default:
      return state;
  }
};
