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
    const res = await fetchNotesFromAPI(UserID);
    if (res.status == "200") {
      dispatch({
        type: FETCH_NOTES_SUCCESS,
        payload: res.notes,
      });
    } else {
      dispatch({
        type: FETCH_NOTES_FAILURE,
        payload: res.message,
      });
    }
  } catch (error) {
    toast.error(`API Error Failed to load user notes: ${error.messagee}`);
    dispatch({
      type: FETCH_NOTES_FAILURE,
      payload: error.message,
    });
  }
};

export const addNote = (note) => async (dispatch) => {
  dispatch({ type: ADD_NOTE_REQUEST });
  try {
    const res = await addNoteToAPI(note);
    if (res.status == "201") {
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: res.note,
      });
    } else if (res.status == "400") {
      dispatch({
        type: ADD_NOTE_FAILURE,
        payload: res.message,
      });
    }
  } catch (error) {
    toast.error(`API Error Failed to add the note: ${error.message}`);
    dispatch({
      type: ADD_NOTE_FAILURE,
      payload: error.message,
    });
  }
};

export const updateNote = (note) => async (dispatch) => {
  dispatch({ type: UPDATE_NOTE_REQUEST });
  try {
    const res = await updateNoteToAPI(note);
    if (res.status == "200") {
      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: res.note,
      });
    } else {
      dispatch({
        type: UPDATE_NOTE_FAILURE,
        payload: res.message,
      });
    }
  } catch (error) {
    toast.error(`API Error Failed to update the note: ${res.message}`);
    dispatch({
      type: UPDATE_NOTE_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  dispatch({ type: DELETE_NOTE_REQUEST });
  try {
    const res = await deleteNoteFromAPI(noteId);
    if (res.status == "200") {
      toast.success("Note successfully deleted !");
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        payload: noteId,
      });
    } else {
      toast.error(`Failed to add the note: ${res.message}`);
      dispatch({
        type: DELETE_NOTE_FAILURE,
        payload: res.message,
      });
    }
  } catch (error) {
    toast.error(`API Error Failed to add the note: ${error.message}`);
    dispatch({
      type: DELETE_NOTE_FAILURE,
      payload: error.message,
    });
  }
};
