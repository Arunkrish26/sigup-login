import React, { useState } from "react";
import "./ResetPassword.css";
import { resetPassword } from "../Services/Api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const initialstateErrors = {
    email: { required: false },

    custom_error: null,
  };

  const [errors, setErrors] = useState(initialstateErrors);

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = initialstateErrors;
    let hasError = false;

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }

    if (!hasError) {
      // we will send an API request
      resetPassword(inputs)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          // if (err.code == "ERR_BAD_REQUEST") {
          //   setErrors({ ...errors, custom_error: "Invalid Credentials" });
          // }
          console.log(err);
        })
        .finally(() => {
          alert("Password reset link successfully Sent to your email address");
          navigate("/login");
        });
    }
    setErrors({ ...errors });
  };

  return (
    <div className="Reset-password">
      <div className="container">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">email</label>
            <input type="email" name="email" onChange={handleInputs} />
            {errors.email.required ? (
              <span className="text-danger">Email is required.</span>
            ) : null}
          </div>

          <div className="btn">
            <button className="" type="submit" disabled={loading}>
              sent reset link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
