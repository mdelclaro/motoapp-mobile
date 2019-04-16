import { RIDES_SET } from "../actions/types";

const INITIAL_STATE = {
  rides: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RIDES_SET:
      return {
        ...state,
        rides: action.payload
      };
    default:
      return state;
  }
};
