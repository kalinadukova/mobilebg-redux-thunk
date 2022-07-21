import { userTypes } from "./user.types";
import { login } from "../../utils/requests";
import {
  createActionWithPayload,
  createActionWithoutPayload,
} from "../../utils/reducers";

export const signInStart = () =>
  createActionWithoutPayload(userTypes.SIGN_IN_START);

export const signInSuccess = (userInfo) =>
  createActionWithPayload(userTypes.SIGN_IN_SUCCESS, userInfo);

export const signInFail = (error) =>
  createActionWithPayload(userTypes.SIGN_IN_FAILED, error);

export const signUpStart = () =>
  createActionWithoutPayload(userTypes.SIGN_UP_START);

export const signUpSuccess = () =>
  createActionWithoutPayload(userTypes.SIGN_UP_SUCCESS);

export const signUpFail = () =>
  createActionWithoutPayload(userTypes.SIGN_UP_FAILED);

export const signUpAction = (userInfo) =>
  createActionWithPayload(userTypes.SIGN_UP, userInfo);

export const logoutAction = () => createActionWithoutPayload(userTypes.lOGOUT);

export const userLoginAsync = (userData) => {
  return async (dispatch) => {
    dispatch(signInStart());

    try {
      const userInfo = await login(userData);
      dispatch(signInSuccess(userInfo));
    } catch (error) {
      dispatch(signInFail(error.message));
    }
  };
};

export const userRegisterAsync = (userData) => {
  return async (dispatch) => {
    dispatch(signUpStart());

    try {
      dispatch(signUpSuccess(userData));
    } catch (error) {
      dispatch(signUpFail(error.message));
    }
  };
};
