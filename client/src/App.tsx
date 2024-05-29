import { useState } from "react";
import Register from "./forms/Register";
import Login from "./forms/Login";
import "./App.css";

const App = () => {
  const [formType, setFormType] = useState("register");

  const renderForm = () => {
    if (formType === "register")
      return <Register changeForm={() => setFormType("login")} />;
    if (formType === "login")
      return <Login changeForm={() => setFormType("register")} />;
  };

  return renderForm();
};

export default App;
