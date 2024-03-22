import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, fetchTags } from '../actions/dataActions';

function NotesAndTags() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.data.notes);
  const tags = useSelector(state => state.data.tags);
  const loadingNotes = useSelector(state => state.data.loadingNotes);
  const loadingTags = useSelector(state => state.data.loadingTags);
  const errorNotes = useSelector(state => state.data.errorNotes);
  const errorTags = useSelector(state => state.data.errorTags);

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div>
      <h2>Notes</h2>
      {loadingNotes ? (
        <div>Loading Notes...</div>
      ) : errorNotes ? (
        <div>Error fetching notes: {errorNotes}</div>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      )}

      <h2>Tags</h2>
      {loadingTags ? (
        <div>Loading Tags...</div>
      ) : errorTags ? (
        <div>Error fetching tags: {errorTags}</div>
      ) : (
        <ul>
          {tags.map(tag => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesAndTags;
