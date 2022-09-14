
searchbtn = document.querySelector('.search-btn')
search = document.getElementById('search')
displayWeather= document.querySelector('.display-weather')
container = document.querySelector('.container')




let getGif = (type) => { 
    
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=pxX8P8BXC0PBTxLvUH80TjeBy95IhecC&s=${type}`, {
    mode: 'cors'})
    .then( (response) => { return response.json()})
    .then( (response) => { container.style.backgroundImage = `url(${response.data.images.original.url})`}) 
    
}
    



let getWeather = async (location) => {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=460396fe45dd52f2277f53ca92f31b49`, { 
    mode: 'cors'})
    let weatherData = await response.json()
    
    displayWeather.classList.remove('hidden')
    displayWeather.children[0].textContent = weatherData.name
    displayWeather.children[1].textContent = `${Math.round(toCelsius(weatherData.main.temp) * 100) / 100} °C`

    return weatherData
}


let toCelsius = (temp) => {

    return (temp-273.15)
}


searchbtn.addEventListener('click', async () => {
    
    if (search.validity.valid) {
        let desc = await getWeather(search.value)
        getGif(desc.weather[0].description)
    }
})


