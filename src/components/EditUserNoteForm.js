import React, { useState } from "react";

const EditUserNoteForm = ({noteEdit, entry, user, editSubmit, hideEditForm, cancelClick}) => {
    const [note, setNote] = useState(noteEdit["note"]);

    const handleSubmit = (e) => {
        e.preventDefault()
        let noteSubmission = {
            id: noteEdit.id,
            note: note,
            entry_id: entry.id,
            user_id: noteEdit.user_id,
            username: user.username,
            entry_name: entry.name
        }
        editSubmit(noteSubmission, e)
        hideEditForm()
    }
    
    return (
        <div className="review-container">
            <div className="form-container">
               
                <h3>Edit Note: {entry.name} ({entry.category})</h3>
                <img src={entry.image_url}></img>
                <form onSubmit={handleSubmit}> 
                <label htmlFor="note">
                    <input
                    type="textarea"
                    name="note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    /><br/>
                </label>
                <div className="form-buttons">
                    <input type="submit" value="Submit" />
                    <button classname="cancel" onClick={()=>cancelClick()}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default EditUserNoteForm;