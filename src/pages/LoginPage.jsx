import React from "react";
import { useState } from "react";
import "./LoginPage.css";
import { loginApi } from "../Services/Api";
import { storeUserData } from "../Services/Storage";
import { isAuthenticated } from "../Services/Auth";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  // initially set false to the erros in usestate (form validation)
  const initialstateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialstateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = initialstateErrors;
    let hasError = false;

    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    if (!hasError) {
      // we will send an API request
      setLoading(true);
      loginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.code == "ERR_BAD_REQUEST") {
            setErrors({ ...errors, custom_error: "Invalid Credentials" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="login-block">
      <div className="container">
        <div className="row ">
          <div className="col login-sec">
            <h2 className="text-center">Login Now</h2>
            <form onSubmit={handleSubmit} className="login-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  onChange={handleInputs}
                />
                {errors.email.required ? (
                  <span className="text-danger">Email is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleInputs}
                />
                {errors.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
                {errors.custom_error ? (
                  <span className="text-danger">
                    <p>{errors.custom_error}</p>
                  </span>
                ) : null}
                <div className="form-group">
                  <Link to="/resetpassword">Forgot Password? </Link>
                </div>
                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Login"
                  disabled={loading}
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Create new account ? Please <Link to="/">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
