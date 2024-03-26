import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../store/tagsSlice';

const Tags = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="m-4">
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
