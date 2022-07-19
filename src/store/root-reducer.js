import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { carsReducer } from "./cars/cars.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cars: carsReducer,
});
