import logo from './logo.svg';
import './App.css';
import NoteCreator from './NoteCreator.js';

const Header = () => {
  return(
    <div className='Header'>
      <h1 className='HeaderFooter-h1'>Header</h1>
    </div>
  )
}

const Footer = () => {
  return(
    <div className='Footer'>
      
    </div>
  )
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
