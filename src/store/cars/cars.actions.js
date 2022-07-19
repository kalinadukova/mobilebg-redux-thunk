import { CAR_TYPES } from "./cars.types";

import {
  createActionWithPayload,
  createActionWithoutPayload,
} from "../../utils/reducers";
import {
  getCarsArray,
  addCar,
  deleteCar,
  updateCar,
} from "../../utils/requests";

const addCarArray = (newCarData, cars) => {
  cars.push(newCarData);
  return [...cars];
};

const updateCarArray = (newCarData, cars) => {
  const carIndex = cars.findIndex((car) => car.id === newCarData.id);

  cars.splice(carIndex, 1, newCarData);

  return [...cars];
};

//get request actions
export const getCarsStart = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_FETCHING_START);

export const getCarsSuccess = (carsArray) =>
  createActionWithPayload(CAR_TYPES.CAR_FETCHING_SUCCESS, carsArray);

export const getCarsFailed = (error) =>
  createActionWithPayload(CAR_TYPES.CAR_FETCHING_FAILED, error);

//post request actions
export const postCarsStart = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_POST_START);

export const postCarsSuccess = (newCarData, cars) =>
  createActionWithPayload(
    CAR_TYPES.CAR_POST_SUCCESS,
    addCarArray(newCarData, cars)
  );

export const postCarsFailed = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_POST_FAILED);

//put request actions
export const putCarsStart = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_PUT_START);

export const putCarsSuccess = (newCarData, cars) =>
  createActionWithPayload(
    CAR_TYPES.CAR_PUT_SUCCESS,
    updateCarArray(newCarData, cars)
  );

export const putCarsFailed = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_PUT_FAILED);

//delete request actions
export const deleteCarStart = () =>
  createActionWithoutPayload(CAR_TYPES.CAR_DELETE_START);

export const deleteCarSuccess = (carId, cars) =>
  createActionWithPayload(
    CAR_TYPES.CAR_DELETE_SUCCESS,
    cars.filter((car) => car.id !== carId)
  );

//thunk
export const fetchCarsAsync = () => {
  return async (dispatch) => {
    dispatch(getCarsStart());

    try {
      const carsArray = await getCarsArray();
      console.log(carsArray);

      dispatch(getCarsSuccess(carsArray));
    } catch (error) {
      dispatch(getCarsFailed(error.message));
    }
  };
};

export const postCarsAsync = (carData, token, cars) => {
  return async (dispatch) => {
    dispatch(postCarsStart());

    try {
      const newCarData = await addCar(carData, token);
      console.log(newCarData);
      dispatch(postCarsSuccess(newCarData, cars));
    } catch (error) {
      dispatch(postCarsFailed(error.message));
    }
  };
};

export const updateCarsAsync = (newCarData, userId, token, cars) => {
  return async (dispatch) => {
    dispatch(putCarsStart());

    try {
      const carData = await updateCar(newCarData, userId, token);
      dispatch(putCarsSuccess(carData, cars));
    } catch (error) {
      dispatch(putCarsFailed(error.message));
    }
  };
};

export const deleteCarsAsync = (carId, userId, token, cars) => {
  return async (dispatch) => {
    dispatch(deleteCarStart());

    try {
      const newCarData = await deleteCar(carId, userId, token);
      console.log(newCarData);
      dispatch(deleteCarSuccess(carId, cars));
    } catch (error) {
      dispatch(postCarsFailed(error.message));
    }
  };
};
