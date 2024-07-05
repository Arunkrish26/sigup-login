import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import RemoveAccount from "./pages/RemoveAccount";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/removeaccount" element={<RemoveAccount />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<DashBoardPage />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
