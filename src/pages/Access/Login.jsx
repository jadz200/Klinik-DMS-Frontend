// Hooks
import React from "react";

//Components
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

//Images
import Logo from "@assets/images/Logo.png";

const Login = ({ setLogin }) => {
  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-login">
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
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText id="password" type="password" className="w-full mb-3" />

          <Button
            label="Sign In"
            icon="pi pi-user"
            className="w-full"
            type="submit"
            onClick={() => {
              setLogin(true);
              localStorage.setItem("visited", true);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
