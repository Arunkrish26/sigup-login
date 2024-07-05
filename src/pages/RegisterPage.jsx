import React, { useState } from "react";
import "./RegisterPage.css";
import { RegisterApi } from "../Services/Api";
import { isAuthenticated } from "../Services/Auth";
import { storeUserData } from "../Services/Storage";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  // initially set false to the erros in usestate (form validation)
  const initialstateErrors = {
    name: { required: false },
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialstateErrors);

  // initially set false to  loading in usestate (loading spinner)

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = initialstateErrors;
    let hasError = false;
    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }
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
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setErrors({
              ...errors,
              custom_error: "Already this email has been Registerd",
            });
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors({
              ...errors,
              custom_error: " Password should be at least 6 characters",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  if (isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form onSubmit={handleSubmit} className="register-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleInputs}
                  id=""
                />
                {errors.name.required ? (
                  <span className="text-danger">Name is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={handleInputs}
                  id=""
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
                  onChange={handleInputs}
                  id=""
                />
                {errors.password.required ? (
                  <span className="text-danger">Password is required.</span>
                ) : null}
              </div>
              <div className="form-group">
                {errors.custom_error ? (
                  <span className="text-danger">
                    <p>{errors.custom_error}</p>
                  </span>
                ) : null}
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}

                <input
                  type="submit"
                  className="btn btn-login float-right"
                  value="Register"
                  disabled={loading}
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Already have account ? Please <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
