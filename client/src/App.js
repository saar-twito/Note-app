import React, { Component } from 'react'
import NavBar from './Components/NavBar/navBar'
import Home from './Components/TopPage/home'
import SignUp from './Components/Forms/signUp'
import SignIn from './Components/Forms/signIn'
import Logout from './Components/Forms/logout'
import NotFound from './Components/Common/notFound'
import NoteMain from './Components/Note/noteMain';
import User from './service/user'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = { user: {} }
  async componentDidMount() {
    this.setState({ user: await User.getCurrentUser() })
  }

  render() {
    const { user } = this.state
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route
            exact
            path="/todo"
            render={props => {
              if (!user) return <Redirect to="/" />
              return <NoteMain {...props} />
            }}
          />
          <Route path="/register" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/not-fount" component={NotFound} />

          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-fount" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App





