import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../redux/actions/NoteActions";
import EditPopup from "./Effects/EditPopup";
import notesImage from "../assets/note.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "./Effects/Loading";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/UserActions";

const Home = () => {
  const dispatch = useDispatch();
  const { notes, loading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.user);
  const [addNoteTitle, setAddNoteTitle] = useState("");
  const [addNoteDescription, setAddNoteDescription] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleAddNote = () => {
    if (addNoteTitle && addNoteDescription) {
      const newNote = {
        name: addNoteTitle,
        description: addNoteDescription,
        userId: user[0]._id,
      };
      dispatch(addNote(newNote));
      setAddNoteTitle("");
      setAddNoteDescription("");
    }
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setNoteTitle(notes[index].name);
    setNoteDescription(notes[index].description);
    setEditing(true);
  };

  const handleUpdateNote = (updatedNote) => {
    const Note = {
      id: notes[editIndex]._id,
      name: updatedNote.name,
      description: updatedNote.description,
    };
    dispatch(updateNote(Note)).then((res) => {
      if (res.status == "200") {
        toast.success("Note Updated Successfully");
        setEditing(false);
        setEditIndex(null);
      } else {
        toast.error(`Error: ${res.message}`);
      }
    });
    setEditing(false);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditIndex(null);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId)).then((res) => {
      if (res.status == "200") {
        toast.success("Note Deleted Successfully");
      } else {
        toast.error(`Error: ${res.message}`);
      }
    });
  };

  const logout = () => {
    toast.warning("Logging out !");
    setTimeout(() => {
      dispatch(logoutUser());
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchNotes(user[0]._id));
    }
  }, [dispatch, user]);

  return user === null ? (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold mb-2">No user found</h2>
      <p className="text-md">Please login to continue.</p>
    </div>
  ) : (
    <div className="container mx-auto p-4">
      {loading && <LoadingAnimation />}
      <ToastContainer />
      {editing && (
        <EditPopup
          note={notes[editIndex]}
          onSave={handleUpdateNote}
          onCancel={handleCancelEdit}
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
          <h2 className="text-2xl font-serif ">
            Hello, {user ? user[0].name : ""} !
          </h2>
        </div>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Note Title"
          required
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-grey-darker"
          value={addNoteTitle}
          onChange={(e) => setAddNoteTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Description"
          required
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-grey-darker"
          value={addNoteDescription}
          onChange={(e) => setAddNoteDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          disabled={loading}
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-blue-100"
          >
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">{note.name}</h3>
              <p className="text-gray-700 text-base">{note.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-5 mx-2 rounded-full"
                onClick={() => handleEditNote(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-5 mx-2 rounded-full"
                onClick={() => handleDeleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
