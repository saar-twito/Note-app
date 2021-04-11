import React, { Component } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Home from './Components/TopPage/Home'
import Register from './Components/Forms/Auth/register'
import Login from './Components/Forms/Auth/login'
import Logout from './Components/Forms/logout'
import NotFound from './Components/Common/NotFound'
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
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
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





