import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Link } from "react-router-dom";

import { login, register } from "../../utils/requests";

import { userLoginAsync } from "../../store/user/user.actions";

import "./RegistrationForm.scss";

export default function RegistrationForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  async function onHandleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      if (
        firstName === "" ||
        lastName === "" ||
        username === "" ||
        password === ""
      ) {
        throw new Error("All fields must be field!");
      }

      if (username.length < 6) {
        throw new Error("Username must be at least 6 characters!");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters!");
      }

      const userData = {
        username,
        password,
        firstName,
        lastName,
      };

      event.target.reset();

      await register(userData);

      const userInfo = await login({
        username,
        password,
      });

      dispatch(userLoginAsync(userInfo));

      navigation("/catalog");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form className="registration-form" onSubmit={onHandleSubmit}>
      <TextField
        className="registration-form-child name-field"
        label="First name"
        placeholder="First name"
        name="firstName"
      />
      <TextField
        className="registration-form-child name-field"
        label="Last name"
        placeholder="Last name"
        name="lastName"
      />
      <TextField
        className="registration-form-child"
        label="Username"
        placeholder="Username"
        name="username"
      />
      <TextField
        className="registration-form-child"
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
      />
      <Button
        variant="contained"
        className="registration-form-child"
        type="submit"
      >
        SIGN UP
      </Button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <Link to="/login" className="registration-form-child link-child">
        Already have an account? Sign in
      </Link>
      <span className="registration-form-child copyright">
        Copyright &copy; Simple Cars 2022
      </span>
    </form>
  );
}
