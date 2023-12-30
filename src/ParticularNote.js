import './CSS/App.css';
import { useState, useEffect } from 'react';
import './CSS/ParticularNote.css';
import { useLocation } from 'react-router-dom';


const CardsRenderer = ({ cardsList }) => {{
    return (
              <div className='ItemsHolder'>
                <div className='Block'></div>
                {cardsList.map((item, index) => {
                  switch (item[0]) {
                    case 'Img':
                      return (
                        <div key={index}>
                          <a href={item[2]} target="_blank" rel="noopener noreferrer">
                            <img src={item[1]} alt={`Image ${index}`} className='RenderedImg'/>
                          </a>
                        </div>
                      );
                    case 'Text':
                      return (
                        <div key={index} className='DirectTextHolder'>
                          <p className='RenderedText'>{item[1]}</p>
                        </div>
                      );
                    case 'Link':
                      return (
                        <div key={index}>
                          <a href={item[1]} target="_blank" rel="noopener noreferrer">
                            {item[2]}
                          </a>
                        </div>
                      );
                    case 'Title':
                      return (
                        <div key={index} className='DirectTextHolder'>
                          <h1>{item[1]}</h1>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            );
  }
};


const ParticularNote = () => {
  const [cardsList, setCardsList] = useState([['Title', 'Default'], ['Text', 'Default']]);
  
  function getSpecificNote(noteTitle){
    fetch(`https://lapis-api.onrender.com/note/${noteTitle}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); 
      console.log(data[0].content)
      console.log(data[0].title)
      setCardsList(data[0].content)
    })
    .catch(error => {
      console.error('Fetch error:', error);
      window.location.pathname = "/*";
    });
  }
  
  const location = useLocation();
  const { pathname } = location;
  
  useEffect(() => {
    // Run getSpecificNote only when pathname changes
    getSpecificNote(pathname.slice(6));
  }, [pathname]); // Add [pathname] as the dependency array
  
  return (
    <div className='Parent'>
      <CardsRenderer cardsList={cardsList}/>
    </div>
  );
}

export default ParticularNote;
