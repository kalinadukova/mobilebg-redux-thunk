// import * as actions from "./user.actions";
import { userTypes } from "./user.types";

const initialState = {
  isAuth: false,
  loading: false,
  currentUser: {
    user: null,
    jwtToken: "",
  },
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.SIGN_IN_START: {
      return {
        loading: true,
        ...state,
      };
    }
    case userTypes.SIGN_IN_SUCCESS: {
      return {
        isAuth: true,
        loading: false,
        ...state,
        currentUser: payload,
      };
    }
    case userTypes.SIGN_IN_FAILED: {
      return {
        loading: false,
        ...state,
        error: payload,
      };
    }
    case userTypes.SIGN_UP_START: {
      return {
        loading: true,
        ...state,
      };
    }
    case userTypes.SIGN_UP_SUCCESS: {
      return {
        loading: false,
        ...state,
        currentUser: payload,
      };
    }
    case userTypes.SIGN_UP_FAILED: {
      return {
        loading: false,
        ...state,
        error: payload,
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
