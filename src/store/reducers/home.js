import {
  COMPLETED_DELIVER_RESPONSE_DATA,
  NEW_DELIVER_RESPONSE_DATA,
} from '../../constants/matcher';

const initialState = {
  newDeliverData: [],
  completedDeliverData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_DELIVER_RESPONSE_DATA:
      return {
        ...state,
        newDeliverData: action.newDeliverResponseData,
      };
    case COMPLETED_DELIVER_RESPONSE_DATA:
      return {
        ...state,
        completedDeliverData: action.completedDeliverResponseData,
      };
    default:
      return state;
  }
};
