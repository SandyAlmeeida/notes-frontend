import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNoteById, createNote, updateNote } from '../store/notesSlice';
import { fetchTags } from '../store/tagsSlice';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteToUpdate = useSelector(state => state.notes.note);
  const tags = useSelector(state => state.tags.tags);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (!id) {
      clearForm();
    } else {
      dispatch(fetchNoteById(id));
    }

    return () => {
      clearForm();
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (id && noteToUpdate) {
      setTitle(noteToUpdate.title || '');
      setDescription(noteToUpdate.description || '');
      setSelectedTags(noteToUpdate.Tags || []);
    }
  }, [id, noteToUpdate]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tags = [];
    if (selectedTags.length > 0) {
      tags = selectedTags.map((tag) => tag.id);
    }
    if (id) {
      dispatch(updateNote({ id, title, description, tags }));
    } else {
      dispatch(createNote({ title, description, tags }));
    }
    clearForm();
    navigate('/notes');
  };

  const handleCheckboxChange = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.some((prevTag) => tag.id === prevTag.id)) {
        return prevTags.filter(selectedTag => selectedTag.id !== tag.id);
      } else {
        return [...prevTags, tag];
      }
    });
  };
  
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setSelectedTags([]);
  };

  return (
    <div className="row m-4">
      <h2>{id ? 'Editar Nota' : 'Criar Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="me-3 mt-3">Título:</label>
        <input className="form-control mt-3" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="me-3 mt-3">Descrição:</label>
        <textarea className="form-control mt-3" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className="mt-3">Tags:</label>
        <div className="form-check mt-3">
          {tags && tags.map(tag => (
            <div key={tag.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={tag.id}
                checked={selectedTags.some(selectedTag => selectedTag.id === tag.id)}
                onChange={() => handleCheckboxChange(tag)}
              />
              <label className="form-check-label">{tag.name}</label>
            </div>
          ))}
        </div>
        <div className="text-end mt-4">
          <button type="submit" className="btn btn-success">{id ? 'Atualizar' : 'Criar'}</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
