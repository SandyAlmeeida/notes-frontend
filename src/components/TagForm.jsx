import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTag, updateTag } from '../store/tagsSlice';

const TagForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagToUpdate = useSelector(state => state.tags.find(tag => tag.id === parseInt(id)));
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (tagToUpdate) {
      setTitle(tagToUpdate.title);
      setDescription(tagToUpdate.description);
    }
  }, [tagToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTag({ id, title, description }));
    } else {
      dispatch(createTag({ title, description }));
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Editar Nota' : 'Criar Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Descrição:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>
    </div>
  );
};

export default TagForm;
