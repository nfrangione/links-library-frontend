import React from 'react'

const NoteCard = ({note, editClick, deleteClick, user}) => {
    return (
        <div className="note-card">
            
            <div className="note-left">
                <p>{note.created_at.slice(0,10)}</p>
                <p>{note.note}</p>
            </div>

            <div className="note-right">
                { user.id == note.user_id ? 
                <div>
                    <p>@{note.username}</p>
                    <button onClick={(e) => editClick(e, note)}>Edit</button>
                    <button onClick={(e) => deleteClick(e, note)}>Delete</button>
                </div> : null
                }
            </div>
        </div>
    )
}

export default NoteCard;