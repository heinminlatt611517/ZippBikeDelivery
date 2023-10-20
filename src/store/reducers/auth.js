import {AUTHENTICATE} from '../../constants/matcher';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
