const c = console.log
window.addEventListener('load', () => {
    let lat,
        long,
        tempDescription = document.querySelector('.temp__description'),
        tempTitle = document.querySelector('.temp__title'),
        iconCanvas = document.querySelector('.icon'),
        locationTimezone = document.querySelector('.location__timezone'),
        tempDegree = document.querySelector('.temp__degree'),
        tempSpan = document.querySelector('.temp__degree span')


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude
            // API https://darksky.net/dev/account
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/9a30e09ae522e017b753f337d584aab5/${lat},${long}`

            fetch(api).then(responseFromApi => {
                return responseFromApi.json()
            }).
            then(data => {
                const {temperature, summary, icon} = data.currently
                c(data)

                // Set DOM Elements from API

                tempTitle.textContent = temperature
                tempDescription.textContent = summary
                locationTimezone.textContent = data.timezone

                // Set icon, API => https://darkskyapp.github.io/skycons/
                setIcons(icon, iconCanvas)

                // Change temperature to Celsius/F

            }) 
        })
    } else {
        // h1.textContent = 'Hey debes aceptar la geolocalización'
        c('Hey esto no va a funcionar si no activas la geolocalización... pues 🙄')
    }

function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"})
    const currentIcon =icon.replace(/-/g, "_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
}
})