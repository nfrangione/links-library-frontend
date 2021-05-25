import React from 'react'

const NoteCard = ({note, editClick, deleteClick, user}) => {
    return (
        <div className="review-card">
            <div className="review-left">
                { user.id == note.user_id ? 
                <div>
                    <button onClick={(e) => editClick(e, note)}>Edit</button>
                    <button onClick={(e) => deleteClick(e, note)}>Delete</button>
                </div> : null
                }
            </div>
            <div className="review-right">
                <p>{note.created_at.slice(0,10)}</p>
                <p>{note.note}</p>
            </div>
        </div>
    )
}

export default NoteCard;