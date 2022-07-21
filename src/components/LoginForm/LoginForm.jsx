import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import carImg from "../../assets/car-img.png";

import "./LoginForm.scss";

import { userLoginAsync } from "../../store/user/user.actions";
import { useState } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";

export default function LoginForm() {
  const [error, setError] = useState();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onHandleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      if (username === "" || password === "") {
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
      };

      event.target.reset();

      dispatch(userLoginAsync(userData));

      if (currentUser.user) navigate("/catalog");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form className="login-form" onSubmit={onHandleSubmit}>
      <TextField
        className="form-child"
        label="Username"
        placeholder="Username"
        name="username"
      />
      <TextField
        className="form-child"
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
      />
      <Button variant="contained" className="login-form-child" type="submit">
        SIGN IN
      </Button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <Link to="/register" className="login-form-child link-child">
        Don't have an account?
      </Link>
      <Link to="/catalog" className="login-form-child link-child">
        Continue to catalog
      </Link>
      <img src={carImg} className="login-form-child img" alt="car" />
      <span className="login-form-child copyright">
        Copyright &copy; Simple Cars 2022
      </span>
    </form>
  );
}
