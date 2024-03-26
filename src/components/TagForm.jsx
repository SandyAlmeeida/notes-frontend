import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTagById, createTag, updateTag } from '../store/tagsSlice';
import { fetchNotes } from '../store/notesSlice';

const TagForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagToUpdate = useSelector(state => state.tags.tag);
  const notes = useSelector(state => state.notes.notes);

  const [name, setName] = useState('');
  const [selectedNotes, setSelectedNotes] = useState([]);

  useEffect(() => {
    if (!id) {
      clearForm();
    } else {
      dispatch(fetchTagById(id));
    }

    return () => {
      clearForm();
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (id && tagToUpdate) {
      setName(tagToUpdate.name || '');
      setSelectedNotes(tagToUpdate.Notes || []);
    }
  }, [id, tagToUpdate]);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let notes = [];
    if (selectedNotes.length > 0) {
      notes = selectedNotes.map((note) => note.id);
    }
    if (id) {
      dispatch(updateTag({ id, name, notes }));
    } else {
      dispatch(createTag({ name, notes }));
    }
    clearForm();
    navigate('/tags');
  };

  const handleCheckboxChange = (note) => {
    setSelectedNotes(prevNotes => {
      if (prevNotes.some((prevNote) => note.id === prevNote.id)) {
        return prevNotes.filter(selectedNote => selectedNote.id !== note.id);
      } else {
        return [...prevNotes, note];
      }
    });
  };
  
  const clearForm = () => {
    setName('');
    setSelectedNotes([]);
  };

  return (
    <div className="row m-4">
      <h2>{id ? 'Editar Tag' : 'Criar Tag'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="me-3 mt-3">Nome:</label>
        <input className="form-control mt-3" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="mt-3">Notas:</label>
        <div className="form-check mt-3">
          {notes && notes.map(note => (
            <div key={note.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={note.id}
                checked={selectedNotes.some(selectedNote => selectedNote.id === note.id)}
                onChange={() => handleCheckboxChange(note)}
              />
              <label className="form-check-label">{note.title}</label>
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

export default TagForm;
