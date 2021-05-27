import React, { useState } from "react";

const FormEditReview = ({noteEdit, entry, editSubmit, hideEditForm}) => {
    const [note, setNote] = useState(noteEdit["note"]);

    const handleSubmit = (e) => {
        e.preventDefault()
        let noteSubmission = {
            id: noteEdit.id,
            note: note,
            entry_id: entry.id,
            user_id: noteEdit.user_id
        }
        editSubmit(noteSubmission, e)
        hideEditForm()
    }
    return (
        <div className="review-container">
            <h1>Edit Note: {entry.title}</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}> 
                <label htmlFor="note">
                    Note:
                    <input
                    type="textarea"
                    name="note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    /><br/><br/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
  );
}

export default FormEditReview;