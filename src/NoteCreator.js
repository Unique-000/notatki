import React from 'react';
import { useState, useEffect } from 'react';
import './CSS/NoteCreator.css';
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineClose } from 'react-icons/ai'; 

function postNote(body){
  let config = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  }

  fetch(`https://lapis-api.onrender.com/note`, config)
  .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log(data); 
      window.location.pathname = "/";
  })
  .catch(error => {
      console.error('Fetch error:', error);
  });
}

const NoteCreator = () => {
    const [cardsList, setCardsList] = useState([['Title', 'Wilderness'], ['Text', 'The wilderness, a vast expanse of untamed beauty, harbors the raw essence of nature. Towering trees whisper ancient secrets, while rugged landscapes challenge and inspire. In this untouched realm, diverse ecosystems thrive, teeming with life. The wilderness beckons, offering a sanctuary for exploration and a canvas for Earths untamed wonders.']]);
    const [wasChangeMade, setWasChangeMade] = useState(false);

    console.log(cardsList);
    const TitleCard = (props) => {
        const [inputValue, setInputValue] = useState('');
        function submit(){
          if (inputValue !== 0){
            cardsList.push([
                'Title', inputValue
            ]);
            console.log(cardsList)
            closeDialog()
            setWasChangeMade(true); 
        }}
        return(
            <div>
                <h1>Title</h1>
                <input onChange={e => setInputValue(e.target.value)} value={inputValue}>
                </input>
                <button onClick={() => submit()}>Submit</button>
            </div>
        )
    }
    
    const TextCard= (props) => {
        const [textareaValue, setTextareaValue] = useState('');
        function submit(){
          if (textareaValue.length !== 0){
            cardsList.push([
                'Text', textareaValue
            ]);
            console.log(cardsList)
            closeDialog()
            setWasChangeMade(true);
          }
        }
        return(
            <div>
                <h1>Text</h1>
                <textarea onChange={e => setTextareaValue(e.target.value)} value={textareaValue}>
                </textarea>
                <button onClick={() => submit()}>Submit</button>
            </div>
        )
    }
    
    const ImgCard = (props) => {
        const [input, setInput] = useState('');
        const [linkToImg, setLinkToImg] = useState('');
        const [imgLink, setImgLink] = useState('');
    
        const handleInputChange = (event) => {
            setInput(event.target.value); // Update the input state
        };

        function parseURL() {
    
            // Regular expressions to extract the values
            const imgRegex = /\[img\](.*?)\[\/img\]/;
            const urlRegex = /\[url=(.*?)\]/;
        
            const imgMatch = input.match(imgRegex);
            const urlMatch = input.match(urlRegex);
        
            if (imgMatch && urlMatch) {
                cardsList.push([
                    'Img', imgMatch[1], urlMatch[1]
                ]);
                console.log(cardsList)
                closeDialog()
                setWasChangeMade(true);
            } else {
                setImgLink('');
                setLinkToImg('');
                alert('Not able to convert')
            }
        };
    
        return(
            <div>
                <h1>Img</h1>
                <div>
                    <a href='https://postimages.org/' target='_blank'><button>Upload</button></a>
                    <input maxLength={100} value={input} onChange={handleInputChange}/>
                    <button onClick={() => parseURL()}>Submit</button>
                    <a href={linkToImg} target='_blank'><img src={imgLink}/></a>
                    <p>Choose 'Thumbnail for forums'</p>
                    <p>Upload only ONE img link!</p>
                </div>
            </div>
        )
    }
    
    const LinkCard = (props) => {
      const [textareaValue, setTextareaValue] = useState('');
      function submit(){
        if (textareaValue.length !== 0 && (textareaValue.startsWith("https://") || textareaValue.startsWith("http://"))) {
          cardsList.push([
              'Link', textareaValue
          ]);
          console.log(cardsList)
          closeDialog()
          setWasChangeMade(true);
        }
        else{
          alert('provide valid link')
        }
      }
      return(
          <div>
              <h1>Text</h1>
              <textarea onChange={e => setTextareaValue(e.target.value)} value={textareaValue}>
              </textarea>
              <button onClick={() => submit()}>Submit</button>
          </div>
      )
    }

    const CardsRenderer = ({ cardsList , type}) => {
        function deleteCard(index){
            console.log('To jest index: ' + index)
            const newItems = [...cardsList];
            newItems.splice(index, 1);
            setCardsList(newItems);
            setWasChangeMade(true);
        }

        switch (type){
            case 'Preview':
                return (
                    <div className='RenderedItemsHolder'>
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
                              <div  key={index} className='DirectTextHolder'>
                                <a href={item[1]} target="_blank" rel="noopener noreferrer">
                                  <p className='RenderedLink'>{item[1]}</p>
                                </a>
                              </div>
                            );
                          case 'Title':
                            return (
                              <div key={index} className='DirectTextHolder'>
                                <h1 className='RenderedTitle'>{item[1]}</h1>
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  );

            case 'Creator':
                return (
                    <div className='CreatorChild-Scrollable'>
                      {cardsList.map((item, index) => {
                        switch (item[0]) {
                          case 'Img':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <div className='CardInfoHolder'>
                                <h1 className='Title-Creator'>Img</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'} className='CloseBtn'/></button>
                                </div>
                                <div className='ChildDiv-Creator'>
                                    <a href={item[2]} target="_blank" rel="noopener noreferrer">
                                    <img src={item[1]} alt={`Image ${index}`} className='RenderedImg-Creator'/>
                                    </a>
                                </div>
                              </div>
                            );
                          case 'Text':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <div className='CardInfoHolder'>
                                <h1 className='Title-Creator'>Text</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'} className='CloseBtn'/></button>
                                </div>
                                <div className='ChildDiv-Creator'>
                                  <p className='RenderedText-Creator'>{item[1]}</p>
                                </div>
                              </div>
                            );
                          case 'Link':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <div className='CardInfoHolder'>
                                <h1 className='Title-Creator'>Link</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'} className='CloseBtn'/></button>
                                </div>
                                <div className='ChildDiv-Creator'>
                                    <a href={item[1]} target="_blank" rel="noopener noreferrer" className='RenderedLink-Creator'>
                                    <p className='Link-Creator'>{item[1]}</p>
                                    </a>
                                </div>
                              </div>
                            );
                          case 'Title':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <div className='CardInfoHolder'>
                                <h1 className='Title-Creator'>Title</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'} className='CloseBtn'/></button>
                                </div>
                                <div className='ChildDiv-Creator'>
                                    <h1 className='RenderedTitle-Creator'>{item[1]}</h1>
                                </div>
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
    const [choosenInput, setChoosenInput] = useState('Default');
    const CenteredDialog = ({ onClose, children }) => {
        return (
          <div className="CenteredDialog">
            <div className="dialog-content">
              <button onClick={onClose} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'} className='CloseBtn'/></button>
              {children}
            </div>
          </div>
        );
      };
        


    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const HiddenMenu = () => {
        if (!['Img', 'Link', 'Text', 'Title'].includes(choosenInput)) {
          return (
            <div>
              <button className='HiddenButton-Left' onClick={() => setChoosenInput('Img')}>Image</button>
              <button className='HiddenButton-Middle1' onClick={() => setChoosenInput('Link')}>Link</button>
              <button className='HiddenButton-Middle2' onClick={() => setChoosenInput('Title')}>Title</button>
              <button className='HiddenButton-Right' onClick={() => setChoosenInput('Text')}>Text</button>
            </div>
          );
        } else {
          switch (choosenInput) {
            case 'Img':
              return <ImgCard prop={'hi'}/>;
            case 'Link':
              return <LinkCard prop={'hi'}/>;
            case 'Title':
              return <TitleCard prop={'hi'}/>;
            case 'Text':
              return <TextCard prop={'hi'}/>;
            default:
              return null;
          }
        }
    };

    const openCardModifier = () => {
      setChoosenInput('Default');
      setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
      setIsDialogOpen(false);
    };

    function publish(cardsList){
        let Title = '';
        
        for (let i = 0; i < cardsList.length; i++) {
          if (cardsList[i][0] === 'Title' && wasChangeMade) {
            Title = cardsList[i][1];
            let body = {
              "title" : Title,
              "content" : cardsList,
              "views" : 0
            }
            postNote(body)
            setWasChangeMade(false);
            console.log('This card list has been passed to our db: ' + cardsList)
            
          }
        }
        
        if (Title === '') {
          alert('there\'s no title, change was made: ' + wasChangeMade);
        }
    }

    return(
        <div className='NoteCreator'>
        <button className='PublishBtn' onClick={() => publish(cardsList)}>Publish</button>
        <div className='SectorsDivider'>
            <div className='Creator'>
                <div className='CreatorChild'>
                    <CardsRenderer cardsList={cardsList} type={'Creator'}/>
                    <button className='AddBtn' onClick={openCardModifier}>
                        <CiCirclePlus size={'40px'} className='AddBtnIcon'/>
                    </button>
                </div>
            </div>

            <div className='Preview'>
                <CardsRenderer cardsList={cardsList} type={'Preview'}/>
            </div>
            {isDialogOpen && (
                <>
                <div className='Default'></div>
                <CenteredDialog onClose={closeDialog}>
                 {/* Your content for the centered dialog */}
                  <HiddenMenu/>
                </CenteredDialog>
                </>
            )}
        </div>
        </div>
    )
}

export default NoteCreator;

