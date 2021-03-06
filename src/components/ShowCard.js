import React, { Component } from 'react'
import CreateNoteForm from './CreateNoteForm'
import EditNoteForm from './EditNoteForm'
import NoteCard from './NoteCard'


export default class ShowCard extends Component {
    state = {
        createForm: false,
        editForm: false,
        note: {}
    }

    handleShowForm = () => {
        this.setState({editForm: false})
        this.setState({createForm: !this.state.createForm})
    }

    hideEditForm = () => {
        
        this.setState({editForm: !this.state.editForm})
    }

    editClick = (e, note) => {
        //e.preventDefault();
        this.setState({createForm: false})
        this.setState({editForm: !this.state.editForm})
        this.setState({note})
    }

    displayByLastEdited = () => {
        return (this.props.entry_show.user_notes.sort((note1, note2) => -1*(new Date(note1.updated_at)-new Date(note2.updated_at))))
    }

    render() {
        return (
        <div className="show-container">
            <div className="main-show">
                <div className="exit-show"><button value='' onClick={()=>this.props.backHome()}>X</button></div>
                <div className="left-show">
                    <img id="show-image" src={this.props.entry_show.image_url}></img>
                    <div className="show-review" >
                        <button className="show-button" onClick={() => this.handleShowForm()}>Make A Note</button>
                    </div>
                </div>
                <div className="right-show">
                    {this.props.category === "equipment" ? <div ><h1>{this.props.entry_show.name} ({this.props.entry_show.category})</h1><h2 hidden={!this.props.entry.attack && !this.props.entry.defense}>Atk: {this.props.entry.attack} Def: {this.props.entry.defense}</h2><h3>Description: {this.props.entry.description}</h3>{this.props.entry.common_locations !== null && this.props.entry.common_locations !== undefined ? <ul>Common Locations: {this.props.entry.common_locations.map(location => <li>{location}</li>)}</ul>:null}</div>: null}
                    {this.props.category === "monsters" ? <div ><h1>{this.props.entry.name} ({this.props.entry.category})</h1>{!this.props.entry.drops || this.props.entry.drops === [] || this.props.entry.drops === undefined || this.props.entry.drops.lenth === 0 ? null : <h3>Drops: {this.props.entry.drops.join(', ')}</h3>}<h3>Description: {this.props.entry.description}</h3>{this.props.entry.common_locations !== null && this.props.entry.common_locations !== undefined ? <ul>Common Locations: {this.props.entry.common_locations.map(location => <li>{location}</li>)}</ul>:null}</div>:null}
                    {this.props.category === "materials" ? <div><h1>{this.props.entry.name} ({this.props.entry.category})</h1><h2 hidden={!this.props.entry.cooking_effect}>Cooking Effect: {this.props.entry.cooking_effect}</h2><h2>Hearts Recovered: {this.props.entry.hearts_recovered}</h2><h3>Description: {this.props.entry.description}</h3>{this.props.entry.common_locations !== null && this.props.entry.common_locations !== undefined ? <ul>Common Locations: {this.props.entry.common_locations.map(location => <li>{location}</li>)}</ul>:null}</div>:null}
                    <div hidden={!this.state.createForm} className="note-form">
                        {this.state.createForm === true ? <CreateNoteForm className="note-pop-up" entry={this.props.entry_show} user={this.props.user} handleShowForm={this.handleShowForm} submitForm={this.props.submitForm}/> : null}
                    </div>
                    <div hidden={!this.state.editForm} className="note-form">
                        {this.state.editForm === true ? <EditNoteForm className="note-pop-up" entry={this.props.entry_show} user={this.props.user} noteEdit={this.state.note} hideEditForm={this.hideEditForm} editSubmit={this.props.editSubmit}/> : null}
                    </div>
                </div>
                
                <div className="notes-container" >
                    <h1>Notes</h1>
                    {this.props.entry_show.user_notes ? this.displayByLastEdited().map(note => <NoteCard key={note.id} note={note} editClick={this.editClick} deleteClick={this.props.deleteClick} loggedIn={this.props.loggedIn} user={this.props.user} users={this.props.users}/>):null}
                </div>
                
                
            </div>
        </div>
        )
    }
}