import { userTypes } from "./user.types";

import {
  createActionWithPayload,
  createActionWithoutPayload,
} from "../../utils/reducers";

export const signInAction = (userInfo) =>
  createActionWithPayload(userTypes.SIGN_IN, userInfo);

export const signUpAction = (userInfo) =>
  createActionWithPayload(userTypes.SIGN_UP, userInfo);

export const logoutAction = () => createActionWithoutPayload(userTypes.lOGOUT);
