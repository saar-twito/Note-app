// * Imports
import React from "react";
import Form from "../../Common/form";
import Joi from "joi-browser";
import user from "../../../service/user";

// * Icons
import { IconContext } from "react-icons";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { FaKey } from "react-icons/fa";

// * Style
import "react-toastify/dist/ReactToastify.css";
import "../style.css";

class SignIn extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(15).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const userCredentials = { ...this.state.data };
      await user.login(userCredentials);
      window.location = "/todo";
    } catch (ex) {
      this.handleError(ex);
    }
  };

  render() {
    return (
      <IconContext.Provider value={{ size: "25px" }}>
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          {this.renderInput(
            <AiOutlineMail />,
            "email",
            "Email",
            "email",
            "johndoe@gmail.com",
            "We'll never share your email with anyone else."
          )}
          {this.renderInput(
            <FaKey />,
            "password",
            "Password",
            null,
            "password"
          )}
          {this.renderButton(
            <VscAccount style={{ marginRight: "10px" }} />,
            "Login"
          )}
        </form>
      </IconContext.Provider>
    );
  }
}

export default SignIn;
