// All the Fields , for showing the value 
const temp = document.getElementById('temp-value');
const humidity = document.getElementById('humd-value');
const condition = document.getElementById('cond-value');
const wind_speed = document.getElementById('wind-value');
const place = document.getElementById('place-details');
const temp_img = document.getElementById('temp-img');
const loc_img = document.getElementById('loc-img');

// element for error handling messages
const problem = document.getElementById('err')

// Getting the data from user data
const input = document.getElementById('place')

// Pausing the submit btn functionallity
const btn = document.getElementById('submit')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    getWeather()
    // getlocimg()
})

// Function for getting the temperatur and other details of the city 
async function getWeather() {
    const city = input.value.trim();

    // checking if the input had a value or not
    if (!city) {
        alert("Please enter a city .......")
    }

    const apiKey = "5882970905084b73b36205334252806";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        let res = await fetch(url)
        // checking if the city is valid or not
        if (!res.ok) {
            throw new Error("City is not valid....")
        }
        let data = await res.json()

        // Entering the data from API inside HTML
        place.innerHTML = `City:- ${data.location.name}  Country:- ${data.location.country}`
        temp.innerHTML = `${data.current.temp_c}°C`
        humidity.innerHTML = `${data.current.humidity}%`
        condition.innerHTML = `${data.current.condition.text}`
        wind_speed.innerHTML = `${data.current.wind_kph}km/h`
        temp_img.src = data.current.condition.icon
    }
    catch (err) {
        problem.innerHTML = `${err}`
    }
}

// FUnction for getting the location img from API
// Roight now its on pending because of API error i will change the API and make it work
async function getlocimg() {
    const city1 = input.value.toLowerCase().replace(/\s+/g, '-');
    const url2 = `https://api.teleport.org/api/urban_areas/slug:${city1}/images/`;

    try {
        const res2 = await fetch(url2)
        if (!res2.ok) throw new Error("City img is not Available")
        const data2 = await res2.json()
        if (data2.photos && data2.photos.length > 0) {
            loc_img.src = data2.photos[0].image.web;
            problem.innerHTML = ""; // clear any previous error
        } else {
            throw new Error("Image data is missing");
        }
        loc_img.src = data2.photos[0].image.web
    }
    catch (err1) {
        problem.innerHTML = `${err1}`
    }
}
