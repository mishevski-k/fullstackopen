const NoteForm = ({HandleSubmit, newNote, handleNoteChange}) => {
    return (
        <form onSubmit={HandleSubmit}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type="submit">save</button>
        </form>
    )
}

export default NoteForm;