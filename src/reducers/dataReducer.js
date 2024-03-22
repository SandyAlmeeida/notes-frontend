// reducers/dataReducer.js
import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from '../actions/dataActions';

const initialState = {
  notes: [],
  tags: [],
  loadingNotes: false,
  loadingTags: false,
  errorNotes: '',
  errorTags: ''
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_REQUEST:
      return {
        ...state,
        loadingNotes: true
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loadingNotes: false,
        notes: action.payload,
        errorNotes: ''
      };
    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        loadingNotes: false,
        notes: [],
        errorNotes: action.payload
      };
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loadingTags: true
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loadingTags: false,
        tags: action.payload,
        errorTags: ''
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loadingTags: false,
        tags: [],
        errorTags: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
