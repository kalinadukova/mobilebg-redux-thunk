import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import React from "react";

export default function Register() {
  return (
    <div className="form-page">
      <div className="form-container">
        <h1>Sign Up</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}
