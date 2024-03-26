import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTags, deleteTag } from '../store/tagsSlice';

const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tags = useSelector(state => state.tags.tags);
  const status = useSelector(state => state.tags.status);
  const error = useSelector(state => state.tags.error);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  const handleNewClick = () => {
    navigate(`/tags/new`);
  };
  
  const handleEditClick = (tagId) => {
    navigate(`/tags/${tagId}/edit`);
  };

  const handleDeleteClick = (tagId) => {
    dispatch(deleteTag(tagId));
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between">
        <h2>Tags</h2>
        <button type="button" className="btn btn-primary" onClick={() => handleNewClick()}>Criar Tag</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tags.map(tag => (
            <tr key={tag.id}>
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <td align='right'>
                <button type="button" className="btn btn-primary" onClick={() => handleEditClick(tag.id)}>Editar</button>
                <button type="button" className="btn btn-danger ms-3" onClick={() => handleDeleteClick(tag.id)}>Excluir</button>
              </td>
            </tr>
          ))}  
        </tbody>
      </table>
    </div>
  );
};

export default Tags;
