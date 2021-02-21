//grap the search form input
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')// # points the id
const messageTwo = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent refreshing the browser

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''    

    const location = search.value
    //const url = 'http://localhost:3000/weather?address='+location
    const url = '/weather?address='+location



    fetch(url).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    } )
})