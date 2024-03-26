import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import Tags from './components/Tags';
import TagForm from './components/TagForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark background-color-navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/notes">Notas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tags">Tags</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/new" element={<NoteForm/>} />
          <Route path="/notes/:id/edit" element={<NoteForm/>} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/new" element={<TagForm/>} />
          <Route path="/tags/:id/edit" element={<TagForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
