import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Show from './pages/Show'
import NavBar from './components/NavBar'

import './App.css';

const baseURL = 'http://localhost:3000/'
const userURL = 'http://localhost:3000/api/v1/'


class App extends Component {
  state = {
    entry_items: [],
    user: {},
    loggedIn: false,
    entryType: "all",
    token: null
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({token: token})
    }
  }

  registerUser = (newUser) => {
    let user = {
      username: newUser.username,
      password: newUser.password
    }
    fetch(`${userURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then (res => res.json())
    .then (data => {
      if(data.error){
        alert(data.error)
      }
      else {
        this.loginUser(user)
      }
    })
  }

  loginUser = (loginSubmit) => {
    fetch (`${userURL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({auth: loginSubmit})
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }
      else {
        localStorage.setItem("token", data.jwt)
        //console.log(data.jwt)
        let createdUser = {
          username: data.user.username,
          id: data.user.id
        }
        this.setState({
          user: createdUser,
          loggedIn: true
        })
        this.getEntries()
      }
    })
  }

  getEntries = () => {
    fetch(`${baseURL}entry_items`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.state.token}`
      }
    })
    .then(r => r.json())
    .then(entries => {
      this.setState({entry_items: entries})
    })
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      user: {},
      loggedIn: false,
      entry_items: []
    })
  }

  

  render () {
    return (
      <div className="App">
        <div>
          <NavBar user={this.state.user} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>
        </div>
          <Switch>
            <Route path="/entry_items">
            {this.state.loggedIn ? <Home entries={this.state.entries}/> : <Redirect to="/" />}
                
            </Route> 

            <Route path="/entry_items/:id">
               <Show />
            </Route>
            
            <Route path="/register">
                {this.state.loggedIn ? <Redirect to="/entry_items" /> : <Register registerUser={this.registerUser}/>}
            </Route>
            
            <Route path="/user">
                <Profile />
            </Route>

            <Route exact path="/">
                {this.state.loggedIn ? <Redirect to="/entry_items" /> : <Login loginUser={this.loginUser}/> }
            </Route>
          </Switch>
      </div>
    )
  }
}

export default App;
