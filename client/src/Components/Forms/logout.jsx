import React from "react";

import user from "../../service/user";

class logout extends React.Component {
  componentDidMount() {
    user.logout();
    window.location = "/login";
  }

  render() {
    return null;
  }
}

export default logout;
