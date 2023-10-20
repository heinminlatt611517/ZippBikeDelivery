import {DELIVER_DETAIL_RESPONSE_DATA} from '../../constants/matcher';

const initialState = {
  deliverDetailsData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELIVER_DETAIL_RESPONSE_DATA:
      return {
        ...state,
        deliverDetailsData: action.deliverDetailsResponseData,
      };
    default:
      return state;
  }
};
