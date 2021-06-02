import React, { useState } from "react";

const CreateNoteForm = ({entry, submitForm, handleShowForm, user}) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault()
      let noteSubmission = {
          note: note,
          entry_item_id: entry.id,
          user_id: user.id,
          username: user.username,
          entry_name: entry.name
      }
      submitForm(noteSubmission, e)
      handleShowForm()
  }

  return (
    <div className="review-container">
        <div className="form-container">
            <h3>Entry Item: {entry.name}</h3>
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

export default CreateNoteForm;