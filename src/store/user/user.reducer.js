// import * as actions from "./user.actions";
import { userTypes } from "./user.types";

const initialState = {
  currentUser: {
    user: null,
    jwtToken: "",
  },
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.SIGN_IN: {
      return {
        ...state,
        currentUser: payload,
      };
    }
    case userTypes.lOGOUT: {
      return {
        ...state,
        currentUser: {
          user: null,
          jwtToken: "",
        },
      };
    }
    default:
      return state;
  }
};
