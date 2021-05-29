import React, { Component } from 'react'
import UserNoteCard from '../components/UserNoteCard'
import EditNoteForm from '../components/EditNoteForm'

export default class Profile extends Component {
    state = {
        editForm: false,
        noteEdit: {},
        entryEdit: {}
    }
    
    editClick = (note, entry) => {
        //e.preventDefault()
        this.setState({noteEdit: note, entryEdit: entry})
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState({editForm: !this.state.editForm})
    }
    
    
    render() {
        return (
            <div>
                <div>
                    <h1>@{this.props.user.username}'s Notes Page</h1>
                </div>
                <div hidden={!this.state.editForm} className="note-form">
                    {this.state.editForm === true ? <EditNoteForm className="note-pop-up" entry={this.state.entryEdit} noteEdit={this.state.noteEdit} hideEditForm={this.toggleEdit} editSubmit={this.props.submitUserNote}/> : null}
                </div>
                <div className="entry-container">
                    {this.props.user_notes.map((note)=> <UserNoteCard key={note.id} note={note} user_entries={this.props.user_entries} editClick={this.editClick}/>)}  
                </div>
            </div>
        )
    }
}