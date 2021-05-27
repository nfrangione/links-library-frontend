import React, { useState } from "react";

const CreateNoteForm = ({entry, submitForm, handleShowForm, user}) => {
  const [note, setNote] = useState("");

   const handleSubmit = (e) => {
        e.preventDefault()
        let noteSubmission = {
            note: note,
            entry_item_id: entry.id,
            user_id: user.id
        }
        submitForm(noteSubmission, e)
        handleShowForm()
    }
  

  return (
    <div className="review-container">
        <h3>Entry Item: {entry.name}</h3>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <label htmlFor="note">
                Note:
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

export default CreateNoteForm;