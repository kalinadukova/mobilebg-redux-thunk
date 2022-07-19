export const createActionWithPayload = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const createActionWithoutPayload = (type) => {
  return {
    type,
  };
};
