import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineClose } from 'react-icons/ai';

const NoteCreator = () => {
    const [cardsList, setCardsList] = useState([['Title', 'Wilderness'], ['Text', 'The wilderness, a vast expanse of untamed beauty, harbors the raw essence of nature. Towering trees whisper ancient secrets, while rugged landscapes challenge and inspire. In this untouched realm, diverse ecosystems thrive, teeming with life. The wilderness beckons, offering a sanctuary for exploration and a canvas for Earths untamed wonders.']]);

    console.log(cardsList);
    const TitleCard = (props) => {
        const [inputValue, setInputValue] = useState('');
        function submit(){
            cardsList.push([
                'Title', inputValue
            ]);
            console.log(cardsList)
            closeDialog()
        }
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
            cardsList.push([
                'Text', textareaValue
            ]);
            console.log(cardsList)
            closeDialog()
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
                const oneVariableValue = imgMatch[1];
                const twoVariableValue = urlMatch[1];
        
                cardsList.push([
                    'Img', oneVariableValue, twoVariableValue
                ]);
                console.log(cardsList)
                closeDialog()
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
    

    const CardsRenderer = ({ cardsList , type}) => {
        function deleteCard(index){
            console.log('To jest index: ' + index)
            const newItems = [...cardsList];
            newItems.splice(index, 1);
            setCardsList(newItems);
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

            case 'Creator':
                return (
                    <div className='CreatorChild-Scrollable'>
                      {cardsList.map((item, index) => {
                        switch (item[0]) {
                          case 'Img':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <h1 className='Title-Creator'>Img</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'}/></button>
                                <hr/>
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
                                <h1 className='Title-Creator'>Text</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'}/></button>
                                <hr/>
                                <div className='ChildDiv-Creator'>
                                  <p className='RenderedText-Creator'>{item[1]}</p>
                                </div>
                              </div>
                            );
                          case 'Link':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <h1 className='Title-Creator'>Link</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'}/></button>
                                <hr/>
                                <div className='ChildDiv-Creator'>
                                    <a href={item[1]} target="_blank" rel="noopener noreferrer" className='RenderedLink-Creator'>
                                    {item[2]}
                                    </a>
                                </div>
                              </div>
                            );
                          case 'Title':
                            return (
                              <div key={index} className='RenderedDiv-Creator'>
                                <div >
                                <h1 className='Title-Creator'>Title</h1>
                                <button onClick={() => deleteCard(index)} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'}/></button>
                                </div>
                                <hr/>
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

    const LinkCard = (props) => {
        return(
            <div>
                <h1>Link</h1>
                <div>
                    <h1>{props.prop}</h1>
                </div>
            </div>
        )
    }
    const [choosenInput, setChoosenInput] = useState('Default');
    const CenteredDialog = ({ onClose, children }) => {
        return (
          <div className="CenteredDialog">
            <div className="dialog-content">
              <button onClick={onClose} className='HiddenMenu-CloseBtn'><AiOutlineClose size={'30px'}/></button>
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
              <button className='HiddenButton' onClick={() => setChoosenInput('Img')}>Img</button>
              <button className='HiddenButton' onClick={() => setChoosenInput('Link')}>Link</button>
              <button className='HiddenButton' onClick={() => setChoosenInput('Title')}>Title</button>
              <button className='HiddenButton' onClick={() => setChoosenInput('Text')}>Text</button>
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
        console.log('This card list has been passed to our db: ' + cardsList)
    }

    return(
        <>
        <button className='PublishBtn' onClick={() => publish(cardsList)}>Publish</button>
        <div className='SectorsDivider'>
            <div className='Creator'>
                <div className='CreatorChild'>
                    <CardsRenderer cardsList={cardsList} type={'Creator'}/>
                    <button className='AddBtn' onClick={openCardModifier}>
                        <CiCirclePlus size={'40px'}/>
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
        </>
    )
}

export default NoteCreator;
