import React from "react";
import Form from "../Common/form";
import Joi from "joi-browser";
import { IconContext } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import classes from "../../Style/index.module.css";
import user from "../../service/user";

class SignUp extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().min(2).max(20).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(15).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const userCredentials = { ...this.state.data };
      const { headers } = await user.register(userCredentials);
      user.setTokenInLocalStorage(headers["x-auth-token"]);
      window.location = "/todo";
    } catch (ex) {
      this.handleError(ex);
    }
  };

  render() {
    return (
      <IconContext.Provider value={{ size: "25px" }}>
        <form className={classes.Form} onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          {this.renderInput(
            <BsFillPersonFill />,
            "name",
            "Your Name",
            "John Doe"
          )}
          {this.renderInput(
            <BsFillPersonFill />,
            "email",
            "Email",
            "johndoe@gmail.com",
            "email",
            "We'll never share your email with anyone else."
          )}
          {this.renderInput(
            <BsFillPersonFill />,
            "password",
            "Password",
            null,
            "password"
          )}
          {this.renderButton(
            <AiFillCheckCircle style={{ marginRight: "10px" }} />,
            "Register Now"
          )}
        </form>
      </IconContext.Provider>
    );
  }
}

export default SignUp;
