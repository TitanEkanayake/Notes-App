import React, { useState } from "react";
import notesImage from "../assets/note.png";
import EditPopup from "./Effects/EditPopup";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [user, setUser] = useState("John Doe");
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addNote = () => {
    if (noteTitle && noteDescription) {
      const newNote = { title: noteTitle, description: noteDescription };
      setNotes([...notes, newNote]);
      setNoteTitle("");
      setNoteDescription("");
    }
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const editNote = (index) => {
    setEditIndex(index);
    setNoteTitle(notes[index].title);
    setNoteDescription(notes[index].description);
    setEditing(true);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = updatedNote;
    setNotes(updatedNotes);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditIndex(null);
  };

  const logout = () => {
    console.log("Logged out");
  };

  return (
    <div className="container mx-auto p-4">
      {editing && (
        <EditPopup
          note={notes[editIndex]}
          onSave={updateNote}
          onCancel={cancelEdit}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-5">
        <img
          className="mx-auto h-24 w-auto"
          src={notesImage}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center font-extrabold text-5xl md:text-5xl lg:text-5xl leading-9 tracking-tight text-gray-900">
          Create your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Notes
          </span>
        </h2>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Hello, {user}!</h2>
        </div>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Note Title"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-grey-darker"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Description"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-grey-darker"
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="border rounded p-4 shadow-lg">
            <h3 className="text-lg font-bold">{note.title}</h3>
            <p className="text-grey-darker">{note.description}</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={() => editNote(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => deleteNote(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
