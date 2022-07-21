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

  try {
    const res = await fetch("http://207.154.210.226/users/login", options);
    if (res.status === 401) {
      throw new Error("Password is incorrect!");
    }
    if (res.status === 500) {
      throw new Error("No such user!");
    }
    const userInfo = await res.json();
    return userInfo;
  } catch (error) {
    throw error.message;
  }
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

  try {
    const res = await fetch("http://207.154.210.226/cars", options);

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const carData = await res.json();
    return carData;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
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

  try {
    const res = await fetch(`http://207.154.210.226/cars/${userId}`, options);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error.message;
  }
}

export async function deleteCar(carId, userId, token) {
  const res = await fetch(`http://207.154.210.226/cars/${carId}/${userId}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  try {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return res;
  } catch (error) {
    throw error.message;
  }
}
