import { combineReducers } from 'redux';
import notesReducer from './notesSlice';
import tagsReducer from './tagsSlice';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer
});

export default rootReducer;