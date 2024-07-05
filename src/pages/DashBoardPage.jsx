import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserDetailsApi } from "../Services/Api";
import { isAuthenticated, logout } from "../Services/Auth";

const DashBoardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    localId: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      UserDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const LogoutUser = () => {
    logout();
    navigate("/login");
    alert("Logged out sucessfully");
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
        <a className="navbar-brand" href="#">
          Dashboard
        </a>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/removeaccount">
                Delete Account
              </Link>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={LogoutUser}
                style={{ cursor: "pointer" }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="container mt-5">
        <div className="p-5">
          <div className=" mt-5">
            <h3>Welcome</h3>
            <hr />

            {user.name && user.email && user.localId ? (
              <div>
                <h4 className="text-bold ">Hi... {user.name}</h4>
                <h6> your Account is Registered Succesfully.</h6>
                <br />
                <p>Your Email is {user.email}</p>
                <p> Your ID : {user.localId}</p>
              </div>
            ) : (
              <p>Loading....</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoardPage;
