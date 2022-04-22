// Hooks
import React, { useState } from "react";
import { useStore } from "../../hooks/Store/useStore";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

//Components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

//Images
import Logo from "@assets/images/Logo.png";
import axios from "axios";

const Login = () => {
  console.log(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  console.log(
    localStorage.getItem("authTokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser);
  const setAuthTokens = useStore((state) => state.setAuthTokens);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";
  const loginUser = (email, password) => {
    axios
      .post("https://klinik-dms-backend.herokuapp.com/auth/token/", {
        email,
        password,
      })
      .then((resp) => {
        console.log(resp.data);
        console.log(jwt_decode(resp.data.access));
        setAuthTokens(resp.data);
        setUser(jwt_decode(resp.data.access));
        localStorage.setItem("authTokens", JSON.stringify(resp.data));
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        console.log(err.response);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-login w-screen z-5 fixed top-0 left-0">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4 md:w-7">
        <div className="text-center mb-5">
          <img src={Logo} alt="hyper" height={75} className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
        </div>

        <form>
          <label htmlFor="email" className="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            type="text"
            className="w-full mb-3"
            autoFocus={true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            className="w-full mb-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            label="Sign In"
            icon="pi pi-user"
            className="w-full"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loginUser(email, password);
              localStorage.setItem("visited", true);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
