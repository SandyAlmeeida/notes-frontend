import axios from 'axios';

const API_URL = 'http://localhost:3000/tags';

export const fetchTags = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await axios.post(API_URL, tagData);
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

export const updateTag = async (tagId, updatedTagData) => {
  try {
    const response = await axios.put(`${API_URL}/${tagId}`, updatedTagData);
    return response.data;
  } catch (error) {
    console.error('Error updating tag:', error);
    throw error;
  }
};

export const deleteTag = async (tagId) => {
  try {
    const response = await axios.delete(`${API_URL}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};
