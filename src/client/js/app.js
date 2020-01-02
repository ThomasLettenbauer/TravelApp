// Personal API Key for OpenWeatherMap API
const apiKey = '&APPID=ff6a890de33795a2a130e0e77b402f46';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value;

    getWeatherData(baseURL, zipCode, apiKey).then(function (weatherData) {
        postData('http://localhost:3000/addWeatherData', { temperature: weatherData.main.temp, date: weatherData.dt, userResponse: myFeelings })
    }).then( function () {       updateUI('http://localhost:3000/all') }
        ).then(function (value) {
        console.log('all promises resolved');
    }, function (reason) {
        console.log('some promise was rejected');
    }

    )
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) => {

    console.log('WEATHER');

    const res = await fetch(baseURL + zipCode + ',de' + apiKey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {

    console.log('POST');
    console.log(data);

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    console.log(data)

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data and Update UI */
const updateUI = async (url = '') => {

    console.log('UPDATE');

    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data)

        document.getElementById("temp").innerHTML = data.temperature;
        document.getElementById("date").innerHTML = data.date;
        document.getElementById("content").innerHTML = data.userResponse;

    } catch (error) {
        console.log("error", error);
    }
}
