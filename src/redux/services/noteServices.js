import axios from "axios";

const URL = import.meta.env.VITE_ENDPOINTURL;

export const fetchNotesFromAPI = async (UserID) => {
  try {
    const res = await axios.get(`${URL}/notes/${UserID}`);
    return res.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while fetching notes."
    );
  }
};

export const addNoteToAPI = async (note) => {
  try {
    const response = await axios.post(`${URL}/notes`, note);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while adding the note."
    );
  }
};

export const updateNoteToAPI = async (note) => {
  try {
    const response = await axios.patch(`${URL}/notes/${note._id}`, note);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the note."
    );
  }
};

export const deleteNoteFromAPI = async (noteId) => {
  try {
    const response = await axios.delete(`${URL}/notes/${noteId}`);
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while deleting the note."
    );
  }
};
