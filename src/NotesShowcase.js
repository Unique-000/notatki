import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import './CSS/NotesShowcase.css';

function transformResponse(originalResponse) {
  return originalResponse.map(item => [
    ['Title', item.title],
    ['Text', item.content[0][0]],
  ]);
}

const NotesShowcase = () => {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    const get10Notes = async (date) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_LAPIS_API}/browse-notes/${date}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = transformResponse(data);
        console.log(transformedData)
        setCardsList(transformedData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    console.log(formattedDate);
    get10Notes(formattedDate);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const CardsRenderer = ({ cardsList }) => {
    return (
      <div className='NotesHolder'>
        {cardsList.map((item, index) => (
          <a href={`/note/${item[0][1]}`}>
          <div key={index} className='NotePreviewCard'>
            <h1 className='CardTitle'>{item[0][1]}</h1>
              <p className='RenderedText'>{item[1][1]}</p>
          </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div className='NotesShowcase'>
      <div className='Block'></div>
      <div className='SearchHolder'>
        <input type='search' className='SearchInput' placeholder='Search notes' />
        <button className='SearchButton'><IoIosSearch /></button>
      </div>
      <CardsRenderer cardsList={cardsList} />
    </div>
  );
};

export default NotesShowcase;
