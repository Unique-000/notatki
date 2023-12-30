import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import './CSS/NotesShowcase.css';

const NotesShowcase = () => {
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [lastCardsDate, setLastCardsDate] = useState('');

  const get10Notes = async (date) => {
    try {
      setIsLoading(true);
      const response = await fetch(date ? `http://localhost:3000/browse-notes/${date}` : 'http://localhost:3000/browse-notes/');
      const data = await response.json();
  
      if ('message' in data) {
        console.log(data.message); // Log the message
        // Optionally, you can update the state or display a message to the user.
      } else {
        const transformedData = transformResponse(data);
        setCardsList(prevCardsList => date ? [...prevCardsList, ...transformedData] : transformedData);
      }
  
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error('Fetch error:', error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    // Initial fetch without a date variable
    get10Notes();
  }, []); // Empty dependency array for the initial fetch

  function transformResponse(originalResponse) {
    setLastCardsDate(originalResponse[originalResponse.length - 1].createdAt)
    return originalResponse.map(item => [
      ['Title', item.title],
      [item.content[0][0], item.content[0][1]],
    ]);
  }

  function handleAnotherFetch() {
    get10Notes(lastCardsDate);
  }

  const CardsRenderer = ({ cardsList }) => {
    return (
      <div className='NotesHolder'>
        {cardsList.map((item, index) => (
          <a key={index} href={`/note/${item[0][1]}`}>
            <div className='NotePreviewCard'>
              <h1 className='CardTitle'>{item[0][1]}</h1>
              <p className='RenderedText'>{item[1][1]}</p>
            </div>
          </a>
        ))}
        <button onClick={handleAnotherFetch} className='LoadMoreBtn'>Load more</button>
      </div>
    );
  };

  return (
    <div className='NotesShowcase'>
      <div className='SearchHolder'>
        <input type='search' className='SearchInput' placeholder='Search notes' />
        <button className='SearchButton'><IoIosSearch /></button>
      </div>
      {isLoading && (
        <div className="loading">Loading&#8230;</div>
      )}
      {isError && (
        <div><h1>There has been an error! Please refresh.</h1></div>
      )}
      <CardsRenderer cardsList={cardsList} />
   </div>
  );
};

export default NotesShowcase;
