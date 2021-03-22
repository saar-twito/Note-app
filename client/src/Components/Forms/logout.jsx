import React, { Component } from "react";

import user from "../../service/user";

class logout extends Component {
  componentDidMount() {
    user.logout();
    window.location = "/signIn";
  }

  render() {
    return null;
  }
}

export default logout;
