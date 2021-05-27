import React, { Component } from 'react'
import UserNoteCard from '../components/UserNoteCard'

export default class Profile extends Component {
    state = {
        user_notes:[],
        user_entries: []
    }
    

    getNotes=()=>{
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
            this.setState({user_entries: data.user.entry_items, user_notes: data.user.user_notes})
        })
    }

    render() {
        
        this.getNotes()
        return (
            <div>
                
                
                <div>
                    <h1>@{this.props.user.username}'s Notes Page</h1>
                </div>
                <div className="entry-container">
                    {this.state.user_notes.map((note)=> <UserNoteCard note={note} user_entries={this.state.user_entries} />)}  
                </div>
                
            </div>
        )
    }
}