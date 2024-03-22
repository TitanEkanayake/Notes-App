import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from "./ActionTypes";
import {
  fetchNotesFromAPI,
  addNoteToAPI,
  updateNoteToAPI,
  deleteNoteFromAPI,
} from "../services/noteServices";

import { toast } from "react-toastify";

export const fetchNotes = (UserID) => async (dispatch) => {
  dispatch({ type: FETCH_NOTES_REQUEST });
  try {
    const userNotes = await fetchNotesFromAPI(UserID);
    if (userNotes.status == "200") {
      dispatch({
        type: FETCH_NOTES_SUCCESS,
        payload: userNotes.notes,
      });
    } else {
      toast.error(`Failed to load user notes: ${userNotes.message}`);
      dispatch({
        type: FETCH_NOTES_FAILURE,
        payload: userNotes.message,
      });
    }
  } catch (error) {
    toast.error(`Failed to load user notes: ${error.messagee}`);
    dispatch({
      type: FETCH_NOTES_FAILURE,
      payload: error.message,
    });
  }
};

export const addNote = (note) => async (dispatch) => {
  dispatch({ type: ADD_NOTE_REQUEST });
  try {
    const newNote = await addNoteToAPI(note);
    if (newNote.status == "201") {
      toast.success("Note successfully added");
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: newNote.note,
      });
    } else if (newNote.status == "400") {
      toast.error(`Failed to add the note: ${newNote.message}`);
      dispatch({
        type: ADD_NOTE_FAILURE,
        payload: newNote.message,
      });
    }
  } catch (error) {
    toast.error(`Failed to add the note: ${error.message}`);
    dispatch({
      type: ADD_NOTE_FAILURE,
      payload: error.message,
    });
  }
};

export const updateNote = (note) => async (dispatch) => {
  dispatch({ type: UPDATE_NOTE_REQUEST });
  try {
    const updatedNote = await updateNoteToAPI(note);
    if (updatedNote.status == "200") {
      toast.success("Note successfully updated !");
      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: updatedNote.note,
      });
    } else {
      toast.error(`Failed to add the note: ${updatedNote.message}`);
      dispatch({
        type: UPDATE_NOTE_FAILURE,
        payload: updatedNote.message,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_NOTE_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  dispatch({ type: DELETE_NOTE_REQUEST });
  try {
    const deletedNote = await deleteNoteFromAPI(noteId);
    if (deletedNote.status == "200") {
      toast.success("Note successfully deleted !");
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        payload: noteId,
      });
    } else {
      toast.error(`Failed to add the note: ${deletedNote.message}`);
      dispatch({
        type: DELETE_NOTE_FAILURE,
        payload: deletedNote.message,
      });
    }
  } catch (error) {
    toast.error(`Failed to add the note: ${error.message}`);
    dispatch({
      type: DELETE_NOTE_FAILURE,
      payload: error.message,
    });
  }
};
