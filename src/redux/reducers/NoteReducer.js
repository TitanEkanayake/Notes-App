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
} from "../actions/ActionTypes";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };
    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: [...state.notes, action.payload],
      };
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case DELETE_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default NoteReducer;
