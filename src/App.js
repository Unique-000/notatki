import './CSS/App.css';
import NoteCreator from './NoteCreator.js';
import NotesShowcase from './NotesShowcase.js';
import NotFound from './NotFound.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticularNote from './ParticularNote';


const App = () => {

  const Header = () => {
    return(
      <div className='Header'>
        <a href='/'><button className='HeaderBtns'>Search</button></a>
        <a href='/creator'><button className='HeaderBtns'>Creator</button></a>
      </div>
    )
  }
  
  const Footer = () => {
    return(
      <div className='Footer'>
        <p>Created by</p>
        <a href='https://unique-000.github.io/' target='_blank'><h1>Unique-000</h1></a>
      </div>
    )
  }

  return (

  <div className="App">
    <Header />
    <div className='AppHolder'>
      <Router>
        <Routes>
          <Route path="/" element={<NotesShowcase />} />
          <Route path="/note/:title" element={<ParticularNote />} />
          <Route path="/creator" element={<NoteCreator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </div>
    <Footer />
  </div>
  );
}

export default App;
