import logo from './logo.svg';
import './App.css';
import NoteCreator from './NoteCreator.js';

const Header = () => {
  return(
    <h1>Header</h1>
  )
}

const Footer = () => {
  
}

const App = () => {
  return (
    <div className="App">
      <Header/>
      <NoteCreator/>
      <Footer/>
    </div>
  );
}

export default App;
