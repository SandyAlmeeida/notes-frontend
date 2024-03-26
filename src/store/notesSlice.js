import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchNotes as fetchNotesAPI, 
  fetchNoteById as fetchNoteByIdAPI, 
  createNote as createNoteAPI, 
  updateNote as updateNoteAPI, 
  deleteNote as deleteNoteAPI 
} from '../api/notesAPI';

const initialState = {
  notes: [],
  note: {},
  editedNote: {},
  status: 'idle',
  error: null
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetchNotesAPI();
  return response;
});

export const fetchNoteById = createAsyncThunk('notes/fetchNoteById', async (noteId) => {
  const response = await fetchNoteByIdAPI(noteId);
  return response;
});

export const createNote = createAsyncThunk('notes/createNote', async (noteData) => {
  const response = await createNoteAPI(noteData);
  return response;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (noteData) => {
  const { id } = noteData;
  delete noteData.id;
  const response = await updateNoteAPI(id, noteData);
  return response;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
  await deleteNoteAPI(noteId);
  return noteId;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setEditedNote: (state, action) => {
      state.editedNote = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNoteById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.note = action.payload;
      })
      .addCase(fetchNoteById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        const existingNoteIndex = state.notes.findIndex(note => note.id === updatedNote.id);
        if (existingNoteIndex !== -1) {
          state.notes[existingNoteIndex] = updatedNote;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const noteId = action.payload;
        state.notes = state.notes.filter(note => note.id !== noteId);
      });
  }
});

export const { setEditedNote } = notesSlice.actions; // Exportar a ação para definir a nota editada

export default notesSlice.reducer;
