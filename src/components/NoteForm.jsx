import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNoteById, createNote, updateNote } from '../store/notesSlice';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteToUpdate = useSelector(state => state.notes.notes); // Obtém apenas a nota atual do estado Redux

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchNoteById(id)); // Despacha a ação para buscar a nota pelo ID
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (noteToUpdate) {
      setTitle(noteToUpdate.title);
      setDescription(noteToUpdate.description);
    }
  }, [noteToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateNote({ id, title, description }));
    } else {
      dispatch(createNote({ title, description }));
    }
    navigate('/notes');
  };

  return (
    <div className="row m-4">
      <h2>{id ? 'Editar Nota' : 'Criar Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="me-3">Título:</label>
        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="me-3">Descrição:</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="text-end mt-4">
          <button type="submit" className="btn btn-success">{id ? 'Atualizar' : 'Criar'}</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
