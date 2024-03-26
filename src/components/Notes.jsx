import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotes, deleteNote } from '../store/notesSlice';

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector(state => state.notes.notes);
  const status = useSelector(state => state.notes.status);
  const error = useSelector(state => state.notes.error);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  const handleEditClick = (noteId) => {
    navigate(`/notes/${noteId}/edit`);
  };

  const handleDeleteClick = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  return (
    <div className="m-4">
      <h2>Notas</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.description}</td>
              <td align='right'>
                <button type="button" className="btn btn-primary" onClick={() => handleEditClick(note.id)}>Editar</button>
                <button type="button" className="btn btn-danger ms-3" onClick={() => handleDeleteClick(note.id)}>Excluir</button>
              </td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
  );
};

export default Notes;
