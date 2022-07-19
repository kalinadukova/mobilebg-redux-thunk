import LoginForm from "../../components/LoginForm/LoginForm";
import React from "react";

import "./Login.scss";

export default function Login() {
  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
