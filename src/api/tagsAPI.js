import axios from 'axios';

const API_URL = 'http://localhost:3000/tags';

export const fetchTags = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error ao buscar tags:', error);
    throw error;
  }
};

export const fetchTagById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tag por ID:', error);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await axios.post(API_URL, tagData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    throw error;
  }
};

export const updateTag = async (tagId, updatedTagData) => {
  try {
    const response = await axios.put(`${API_URL}/${tagId}`, updatedTagData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tag:', error);
    throw error;
  }
};

export const deleteTag = async (tagId) => {
  try {
    const response = await axios.delete(`${API_URL}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir tag:', error);
    throw error;
  }
};
