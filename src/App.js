import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'

import './App.css';

const baseURL = 'http://localhost:3000/'
const userURL = 'http://localhost:3000/api/v1/'


class App extends Component {
  state = {
    entry_items: [],
    user: {},
    loggedIn: false,
    token: null,
    user_notes: [],
    user_entries: [],
    categoryFilter: '',
    searchInput: '',
    searchNotes: '',
    sortBy: ''
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({token: token})
      this.getEntries()
      this.getUserNotes()
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
      if(data.message){
        alert(data.message)
      }
      else {
        localStorage.setItem("token", data.jwt)
        this.setState({token: data.jwt})
        this.getEntries()
        let createdUser = {
          username: data.user.username,
          id: data.user.id
        }
        this.setState({
          user: createdUser,
          loggedIn: true,
          token: data.jwt,
          user_notes: data.user.user_notes,
          user_entries: data.user.entry_items,
        })
        
      }
    })
  }

  // Fetch index of Entry Items Controller
  getEntries = () => {
    console.log("GOT ENTRIES")
    fetch(`${baseURL}entry_items/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(r => r.json())
    .then(entries => {
      this.setState({entry_items: entries})
    })
  }

  //Grab User's Notes
  getUserNotes=()=>{
    console.log("GOT USER NOTES")
    fetch(`http://localhost:3000/api/v1/profile`, {
        method: "GET",
        headers:  {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let userGet = {
        username: data.user.username,
        id: data.user.id
      }
      this.setState({loggedIn: true})
      this.setState({user: userGet})
      this.setState({user_entries: data.user.entry_items, user_notes: data.user.user_notes})
    })
  }

  //Read user input to search bar
  handleFilteredSearch = (search) => {
    this.setState({searchInput: search})
  }

  //Filtering entry items on home page by search bar input
  filteredItems = () => {
    if (this.state.searchInput === '') {
      return this.state.entry_items
    }
    else {
      let filteredEntries = this.state.entry_items.filter(entry_item=> entry_item.name.includes(this.state.searchInput.toLowerCase()) ? entry_item:null)
      return filteredEntries
    }
  }

  //Read button click for filter entry items by category
  handleCategoryFilter = (e) => {
    this.setState({categoryFilter: e.target.value})
  }

  //Returns Items based on category and search (if there is a search)
  categoryFilteredItems = () => {
    if(this.state.categoryFilter === 'monsters') {
      return([...this.filteredItems()].filter(item => item.category === 'monsters'))
    }
    else if(this.state.categoryFilter === 'equipment') {
      return([...this.filteredItems()].filter(item => item.category === 'equipment'))
    }
    else if(this.state.categoryFilter === 'materials') {
      return([...this.filteredItems()].filter(item => item.category === 'materials'))
    }
    else {
      return(this.filteredItems())
    }
  }

  //Handling user search bar input
  handleSearchNotes = (search) => {
    this.setState({searchNotes: search})
  }

  searchNotes = () => {
    if (this.state.searchNotes === '') {
      return this.state.user_notes
    }
    else {
      let searchResults = this.state.user_notes.filter(user_note => user_note.entry_name.includes(this.state.searchNotes.toLowerCase()) ? user_note:null)
      return searchResults
    }
  }

  //Handling returned notes order based on search input and selected sort by method 
  sortNotes = (e) => {
    this.setState({sortBy: e.target.value})
  }

  sortedNotes = () => {
    if (this.state.sortBy === 'alphabetical') {
      return([...this.searchNotes()].sort((note1, note2) => note1.entry_name < note2.entry_name ? -1:1))
    }
    else if(this.state.sortBy === 'recency') {
      return([...this.searchNotes()].sort((note1, note2) => -1*(note1.id-note2.id)))
    }
    else if(this.state.sortBy === 'edited') {
      return([...this.searchNotes()].sort((note1, note2) => -1*(new Date(note1.updated_at)-new Date(note2.updated_at))))
    }
    else if (this.state.sortBy === 'created'){
      return([...this.searchNotes()].sort((note1, note2) => note1.id-note2.id)) 
    }
    else {
      return(this.searchNotes())
    }
  }

  submitUserNote = (submitNote) => {
    fetch(`http://localhost:3000/user_notes/${submitNote.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(submitNote)
    })
    .then(res => res.json())
    .then(note => {
      this.getUserNotes()
      this.getEntries()
      //let newUserNotes = this.state.user_notes.map(currentNote => currentNote.id === note.id ? note:currentNote)
      //this.setState({user_notes: newUserNotes})
    })
  }

  updateProfile = () => {
    this.getUserNotes()
  }

  handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      user: {},
      loggedIn: false,
      user_notes: [],
      user_entries: [],
      token: null,
      categoryFilter: '',
      searchInput: '',
      searchNotes: '',
      sortBy: '',
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
            {this.state.loggedIn ? <Home entry_items={this.categoryFilteredItems()} token={this.state.token} user={this.state.user} submitUserNote={this.submitUserNote} updateProfile={this.updateProfile} handleFilteredSearch={this.handleFilteredSearch} handleCategoryFilter={this.handleCategoryFilter} search={this.state.searchInput}/> : <Redirect to="/" />}
                
            </Route>
            
            <Route path="/register">
                {this.state.loggedIn ? <Redirect to="/entry_items" /> : <Register registerUser={this.registerUser}/>}
            </Route>
            
            <Route path="/profile">
                {this.state.loggedIn ? <Profile user={this.state.user} user_notes={this.sortedNotes()} user_entries={this.state.user_entries} submitUserNote={this.submitUserNote} handleSearchNotes={this.handleSearchNotes} sortNotes={this.sortNotes} searchSave={this.state.searchNotes} /> : <Redirect to="/" />}
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
