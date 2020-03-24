const form = document.querySelector('form')
const input = document.querySelector('input')
const loadingImage = document.querySelector('#loadingImage')
const imageSection = document.querySelector('section')

form.addEventListener('submit', formSubmitted)

loadingImage.style.display = 'none';

function formSubmitted(event) {
    event.preventDefault()
    const searchTerm = input.value

    searchStart()
    search(searchTerm)
    .then((result) => { 
        noImages(result),
        displayImages(result)
    })
    .then(() => {
        loadingImage.style.display = 'none';
    })
}

function noImages(result) {
    if(result.length === 0 && input.value !== ''){
        return document.getElementById('noImage').innerHTML="Es wurde kein Bild mit der Bezeichnung " + "'" + input.value + "'" + " gefunden"
    } else {
        return document.getElementById('noImage').innerHTML=""
    }
}

function searchStart() {
    loadingImage.style.display = '';
    imageSection.innerHTML = '';
}

function search(searchTerm){
    return fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=84sHIaQrR9rSmxJKVr4c1O2orNTm00OeANCnpZ-Yta0`)
    .then(response => response.json())
    .then(result => { return result.results })
}

function displayImages(image) {
    image.forEach(image =>{
        const imageElement = document.createElement('img')
        imageElement.src = image.urls.regular
        imageSection.appendChild(imageElement)
    })
}