import { CAR_TYPES } from "./cars.types";

const CARS_INITIAL_STATE = {
  cars: [],
  loading: false,
  error: null,
};

export const carsReducer = (state = CARS_INITIAL_STATE, action) => {
  switch (action.type) {
    case CAR_TYPES.CAR_DELETE_START:
    case CAR_TYPES.CAR_PUT_START:
    case CAR_TYPES.CAR_POST_START:
    case CAR_TYPES.CAR_FETCHING_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case CAR_TYPES.CAR_DELETE_SUCCESS:
    case CAR_TYPES.CAR_PUT_SUCCESS:
    case CAR_TYPES.CAR_POST_SUCCESS:
    case CAR_TYPES.CAR_FETCHING_SUCCESS: {
      return {
        ...state,
        cars: action.payload,
        loading: false,
      };
    }
    case CAR_TYPES.CAR_DELETE_FAILED:
    case CAR_TYPES.CAR_PUT_FAILED:
    case CAR_TYPES.CAR_POST_FAILED:
    case CAR_TYPES.CAR_FETCHING_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
