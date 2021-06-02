import React, { useState } from "react";

const EditNoteForm = ({noteEdit, entry, user, editSubmit, hideEditForm}) => {
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
            <h3>Edit Note: {entry.name}</h3>
                <form onSubmit={handleSubmit}> 
                <label htmlFor="note">
                    <input
                    type="textarea"
                    name="note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    /><br/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
  );
}

export default EditNoteForm;