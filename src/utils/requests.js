export async function register(userData) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  await fetch("http://207.154.210.226/users/register", options);
}

export async function login(userData) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
    }),
  };

  const res = await fetch("http://207.154.210.226/users/login", options);

  if (res.status === 401) {
    throw new Error("Password is incorrect!");
  }

  if (res.status === 500) {
    throw new Error("No such user!");
  }
  return await res.json();
}

export async function getCarsArray() {
  const res = await fetch("http://207.154.210.226/cars/all");
  return res.json();
}

export async function addCar(data, token) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  };

  const res = await fetch("http://207.154.210.226/cars", options);

  const carData = await res.json();
  return carData;
}

export async function updateCar(newCarData, userId, token) {
  const options = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newCarData),
  };
  const res = await fetch(`http://207.154.210.226/cars/${userId}`, options);
  const data = await res.json();
  return data;
}

export async function deleteCar(carId, userId, token) {
  const res = await fetch(`http://207.154.210.226/cars/${carId}/${userId}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res;
}
