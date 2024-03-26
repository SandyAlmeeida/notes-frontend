import axios from 'axios';

const API_URL = 'http://localhost:3000/notes';

export const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const fetchNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar nota por ID:', error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const updateNote = async (noteId, updatedNoteData) => {
  try {
    const response = await axios.put(`${API_URL}/${noteId}`, updatedNoteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${API_URL}/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};