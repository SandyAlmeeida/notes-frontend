// actions/dataActions.js
import axios from 'axios';

// Ação para buscar as "notes"
export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const fetchNotes = () => {
  return async dispatch => {
    dispatch({ type: FETCH_NOTES_REQUEST });
    try {
      const response = await axios.get('localhost:3000/notes');
      dispatch({ type: FETCH_NOTES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_NOTES_FAILURE, payload: error.message });
    }
  };
};

// Ação para buscar as "tags"
export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const fetchTags = () => {
  return async dispatch => {
    dispatch({ type: FETCH_TAGS_REQUEST });
    try {
      const response = await axios.get('localhost:3000/tags');
      dispatch({ type: FETCH_TAGS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_TAGS_FAILURE, payload: error.message });
    }
  };
};
