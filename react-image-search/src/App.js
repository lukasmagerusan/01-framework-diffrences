import React, { useState } from 'react';

function App() {

  const [title, setTitle] = useState('🍨 JavaScript')
  const [userInput, setUserInput] = useState('')
  const [images, setImages] = useState([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [noImageFound, setNoImageFound] = useState('')

  const verification = value => {
    value.length === 0 ? setNoImageFound('Kein Bilder wurde unter der Bezeichnung ' + '"' + userInput + '"' + ' gefunden!') : setNoImageFound('')
  }

  const loading = value => {
    setLoadingImage(value)
  }

  const getImages = value => {
    return fetch(`https://api.unsplash.com/search/photos?page=1&query=${value}&client_id=84sHIaQrR9rSmxJKVr4c1O2orNTm00OeANCnpZ-Yta0`)
    .then(response => response.json())
    .then(result => setImages(result.results) & verification(result.results))
  }

  const search = event => {
    event.preventDefault();
    loading(true)
    getImages(userInput).then(() => loading(false))
  }

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={search}>
        <label>Suche nach einem Bild</label>
        <input
          value={userInput}
          className="u-full-width"
          type="text"
          onChange={e => setUserInput(e.target.value)}
          />
        <button type="submit">Suche</button>
        </form>
        <h1>{noImageFound}</h1>
        { loadingImage ? <img className="loadingImage" alt="Loading..." src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/> : ''}
        <section className="imageSection">
        {
          images.map(image => {
            return <img className="image" src={image.urls.regular} alt={image.description} key={image.id}/>
          })
        }
        </section>
    </div>
  );
}

export default App;
