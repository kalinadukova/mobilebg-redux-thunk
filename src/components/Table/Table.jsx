import MaterialTable from "material-table";
import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteCarsAsync,
  fetchCarsAsync,
  postCarsAsync,
  updateCarsAsync,
} from "../../store/cars/cars.actions";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCars } from "../../store/cars/cars.selector";
import { useEffect } from "react";

export default function Table() {
  const columns = [
    { title: "Make", field: "make" },
    { title: "Model", field: "model" },
    { title: "Year", field: "year" },
    {
      title: "Engine Type",
      field: "engineType",
      lookup: {
        DIESEL: "DIESEL",
        HYBRID: "HYBRID",
        ELECTRIC: "ELECTRIC",
        GASOLINE: "GASOLINE",
      },
    },
    {
      title: "Gear Box",
      field: "gearBox",
      lookup: { AUTOMATIC: "AUTOMATIC", MANUAL: "MANUAL" },
    },
    {
      title: "Condition",
      field: "condition",
      lookup: { NEW: "NEW", USED: "USED", PARTS: "PARTS" },
    },
    { title: "Horse Power", field: "horsePower" },
    { title: "Color", field: "color" },
    { title: "Price $", field: "price" },
    { title: "City", field: "city" },
    { title: "Mileage", field: "mileage" },
    { title: "Extras", field: "extras" },
  ];

  const currentUser = useSelector(selectCurrentUser);
  const cars = useSelector(selectCars);

  const dispatch = useDispatch();

  let userInfo;
  let token;

  if (currentUser.user) {
    userInfo = currentUser.user;
    token = currentUser.jwtToken;
  }

  useEffect(() => {
    dispatch(fetchCarsAsync());
  }, []);

  return (
    <div>
      <MaterialTable
        title="Simple Cars"
        columns={columns}
        data={cars}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: userInfo
            ? (newData) =>
                new Promise((resolve, reject) => {
                  const requestData = {
                    ...newData,
                    user: userInfo,
                  };
                  console.log(requestData);
                  dispatch(postCarsAsync(requestData, token, cars));
                  resolve();
                })
            : null,
          onRowDelete: userInfo
            ? (oldData) =>
                new Promise((resolve, reject) => {
                  if (oldData.user.id !== userInfo.id) {
                    alert("Not the owner");
                    reject();
                  } else {
                    dispatch(
                      deleteCarsAsync(oldData.id, userInfo.id, token, cars)
                    );
                    resolve();
                  }
                })
            : null,
          onRowUpdate: currentUser.user
            ? (newData, oldData) =>
                new Promise((resolve, reject) => {
                  if (oldData.user.id !== userInfo.id) {
                    alert("Not the owner");
                    reject();
                  } else {
                    dispatch(
                      updateCarsAsync(newData, userInfo.id, token, cars)
                    );
                    resolve();
                  }
                })
            : null,
        }}
      />
    </div>
  );
}
