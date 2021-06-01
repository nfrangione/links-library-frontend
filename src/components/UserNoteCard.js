import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class UserNoteCard extends Component {

    findEntryMatch = (id) => {
        let entryMatch = this.props.user_entries.find((entry) => entry.id == id)
        return entryMatch
    }
    
    render() {
        let entryForNote = this.findEntryMatch(this.props.note.entry_item_id)
        return (
            
            <div className="entry-card" >
                <div className="item_display">
                    <img src={entryForNote.image_url}></img>
                    <h3>{entryForNote.name} ({entryForNote.category}) </h3>
                </div>
                <div className="note_date">
                    <p>Last Update: {this.props.note.updated_at.slice(0,10)}</p>
                    <p>My Notes: {this.props.note.note}</p>
                    
                </div>
                <div>
                    <button onClick={(e) => this.props.editClick(this.props.note, entryForNote)}>Edit</button>
                </div>
                <br/>
            </div>
            
        )
    }
}