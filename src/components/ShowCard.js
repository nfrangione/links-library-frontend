import React, { Component } from 'react'
import CreateNoteForm from './CreateNoteForm'
import EditNoteForm from './EditNoteForm'
import NoteCard from './NoteCard'
import { Link } from 'react-router-dom'


export default class ShowCard extends Component {
    state = {
        createForm: false,
        editForm: false,
        note: {}
    }

    handleShowForm = () => {

        this.setState({createForm: !this.state.createForm})
    }

    hideEditForm = () => {
        this.setState({editForm: !this.state.editForm})
    }

    editClick = (e, note) => {
        e.preventDefault();
        this.setState({editForm: !this.state.editForm})
        this.setState({note})
    }

    render() {
        
        return (
        <div className="show-container">
            <div className="main-show">
                <div className="exit-show"><button onClick={()=>this.props.backHome()}>X</button></div>
                <div className="left-show">
                    <img id="show-image" src={this.props.entry.image}></img>
                </div>
                <div className="right-show">
                    <h1>{this.props.entry.name} ({this.props.entry.category})</h1>
                    <h2>Atk: {this.props.entry.attack} Def: {this.props.entry.defense}</h2>
                    <h3>Description: {this.props.entry.description}</h3>
                    {/* <ul>Common Locations: {this.props.entry["common_location"].map((location) => <li>{location}</li>)}</ul> */}
                    <div className="show-review">
                        <button className="show-button" onClick={() => this.handleShowForm()}>Make A Note</button>
                    </div>
                    <div hidden={!this.state.createForm} className="review-form">
                        {this.state.createForm === true ? <CreateNoteForm className="review-pop-up" entry={this.props.entry_show} user={this.props.user} handleShowForm={this.handleShowForm} submitForm={this.props.submitForm}/> : null}
                    </div>
                    <div hidden={!this.state.editForm} className="review-form">
                        {this.state.editForm === true ? <EditNoteForm className="review-pop-up" entry={this.props.entry_show} noteEdit={this.state.note} hideEditForm={this.hideEditForm} editSubmit={this.props.editSubmit}/> : null}
                    </div>
                    <div className="notes-container">
                        <h1>Notes</h1>
                        {this.props.entry_show.user_notes ? this.props.entry_show.user_notes.map(note => <NoteCard key={note.id} note={note} editClick={this.editClick} deleteClick={this.props.deleteClick} loggedIn={this.props.loggedIn} user={this.props.user} users={this.props.users}/>):null}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}