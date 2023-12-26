import logo from './logo.svg';
import './CSS/App.css';
import NoteCreator from './NoteCreator.js';
import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import './CSS/NotesShowcase.css';

const NotFound = () => {
  return (
    <div className="NotesShowcase">
      <div className='Block'></div>
        <h1>Error!</h1>
        <h1>Site not found</h1>
        <a href='/'><button className='HeaderFooter-h1'>Home</button></a>
    </div>
  );
}

export default NotFound;
