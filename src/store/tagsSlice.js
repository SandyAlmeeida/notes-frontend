import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchTags as fetchTagsAPI, 
  fetchTagById as fetchTagByIdAPI,
  createTag as createTagAPI, 
  updateTag as updateTagAPI, 
  deleteTag as deleteTagAPI 
} from '../api/tagsAPI';

const initialState = {
  tags: [],
  tag: {},
  editedTag: {},
  status: 'idle',
  error: null
};

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await fetchTagsAPI();
  return response;
});

export const fetchTagById = createAsyncThunk('tags/fetchTagById', async (tagId) => {
  const response = await fetchTagByIdAPI(tagId);
  return response;
});

export const createTag = createAsyncThunk('tags/createTag', async (tagData) => {
  const response = await createTagAPI(tagData);
  return response;
});

export const updateTag = createAsyncThunk('tags/updateTag', async (tagData) => {
  const { id } = tagData;
  delete tagData.id;
  const response = await updateTagAPI(id, tagData);
  return response;
});

export const deleteTag = createAsyncThunk('tags/deleteTag', async (tagId) => {
  await deleteTagAPI(tagId);
  return tagId;
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setEditedTag: (state, action) => {
      state.editedTag = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTagById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTagById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tag = action.payload;
      })
      .addCase(fetchTagById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const updatedTag = action.payload;
        const existingTagIndex = state.tags.findIndex(tag => tag.id === updatedTag.id);
        if (existingTagIndex !== -1) {
          state.tags[existingTagIndex] = updatedTag;
        }
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        const tagId = action.payload;
        state.tags = state.tags.filter(tag => tag.id !== tagId);
      });
  }
});


export const { setEditedTag } = tagsSlice.actions; // Exportar a ação para definir a tag editada

export default tagsSlice.reducer;
