import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import './CSS/NotesShowcase.css';

const NotesShowcase = () => {
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [lastCardsDate, setLastCardsDate] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const get10Notes = async (date) => {
    try {
      setIsLoading(true);
      console.log(date ? `https://lapis-api.onrender.com/browse-notes/date/${date}` : 'https://lapis-api.onrender.com/browse-notes/date/')
      const response = await fetch(date ? `https://lapis-api.onrender.com/browse-notes/date/${date}` : 'https://lapis-api.onrender.com/browse-notes/date/');
      const data = await response.json();
  
      if ('message' in data) {
        console.log(data.message); 

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
  
  const searchNotes = async (title) => {
    try {
      setIsLoading(true);
      console.log(`https://lapis-api.onrender.com/browse-notes/title/${title}`)
      const response = await fetch(`https://lapis-api.onrender.com/browse-notes/title/${title}`);
      const data = await response.json();
  
      if ('message' in data) {
        console.log(data.message);
      
      } else {
        const transformedData = transformResponse(data);
        setCardsList(transformedData);
      }
  
      setIsLoading(false);
      setIsSearched(true)
    } catch (error) {
      setIsError(true);
      console.error('Fetch error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {

    get10Notes();
  }, []); 

  function transformResponse(originalResponse) {
    console.log(originalResponse)
    setLastCardsDate(originalResponse[originalResponse.length - 1].createdAt)
    return originalResponse.map(item => [
      ['Title', item.title],
      [item.content[0][0], item.content[0][1]],
    ]);
  }

  function handleAnotherFetch() {
    console.log('Last Cards Date:', lastCardsDate);

    const isoDateString = new Date(lastCardsDate).toISOString();
    
    console.log('ISO Date String:', isoDateString);
    
    get10Notes(isoDateString);
  }

  function handleSearch(){
    searchNotes(searchValue)
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
      {!isLoading && !isError && !isSearched &&(
        <button onClick={handleAnotherFetch} className='LoadMoreBtn'>
          Load more
        </button>
      )}
  </div>
    );
  };

  return (
    <div className='NotesShowcase'>
      <div className='SearchHolder'>
        <input type='search' className='SearchInput' onChange={e => setSearchValue(e.target.value)} value={searchValue} placeholder='Search notes' />
        <button className='SearchButton' onClick={handleSearch}><IoIosSearch /></button>
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
