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
            
            <div className="entry-card" onClick={(e)=>this.props.onClick(e, entryForNote)}>
                <div className="item_display">
                    <img src={entryForNote.image_url}></img>
                    <h3 >{entryForNote.name} ({entryForNote.category}) </h3>
                </div>
                <div className="note_date">
                    <p>{this.props.note.created_at.slice(0,10)}</p>
                    <p>{this.props.note.note}</p>
                    
                </div>
                <div>
                    <button onClick={(e) => this.props.editClick(e, this.props.note)}>Edit</button>
                    <button onClick={(e) => this.props.deleteClick(e, this.props.note)}>Delete</button>
                </div>
                <br/>
            </div>
            
        )
    }
}