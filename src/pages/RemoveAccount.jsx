import React from "react";
import { useState } from "react";
import "./RemoveAccount.css";
import { DeleteAccApi } from "../Services/Api";
import { useNavigate } from "react-router-dom";
import { DeleteTokenId } from "../Services/Auth";
import { Link } from "react-router-dom";

const RemoveAccount = () => {
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

  const navigate = useNavigate();

  //   when the user hit the delete button this function will execute

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
      DeleteAccApi(inputs)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            DeleteTokenId();
            alert("succesfully account Deleted");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          //   alert("invalid credentials");
          if (err.response.data.error == "USER_NOT_FOUND") {
            // setErrors({ ...errors, custom_error: "Invalid Credentials" });
            alert(err.response.data.error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setErrors({ ...errors });
  };

  return (
    <div className="RemoveAccount">
      <div className="DeleteAccount">
        <h2>Remove account</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="Email">Email</label>
              <input type="Email" name="email" onChange={handleInputs} />
              {errors.email.required ? (
                <span className="text-danger">Email is required.</span>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="Password">Password</label>
              <input type="Password" name="password" onChange={handleInputs} />
              {errors.password.required ? (
                <span className="text-danger">Password is required.</span>
              ) : null}
            </div>
            <div className="input-group">
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
            </div>
          </div>
          <div className="btn">
            <button type="submit" disabled={loading}>
              Delete Account
            </button>
          </div>
          <Link to="/dashboard">Go to Dashboard</Link>
        </form>
      </div>
    </div>
  );
};

export default RemoveAccount;
