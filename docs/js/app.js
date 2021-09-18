
    // Personal API Key for OpenWeatherMap
    const iconPath = 'https://openweathermap.org/img/wn/'
    const apiKey ='6cf53b58eb8cc461795095781705e3c2'
// 25a6e1317cc2250dcf177925fa02d357
// Event listener to add function to existing HTML DOM element
        document.getElementById('generate').addEventListener('click', generate);

    /* Function called by event listener */
    function generate() {
        let zipcode = document.getElementById("zip");
        console.log("fetch weather data");
        console.log(zipcode.value)
        if (zipcode.value !== '') {
            let url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode.value + '&units=imperial&appid=' + apiKey;
            // call getWeatherData function and pass url + saveWeatherData function
            getWeatherData(url, saveWeatherData, displayErrorMessage).then(() => {
            });
        }

        zipcode.value = ''
    }


    function saveWeatherData(data) {
        console.log(data);

        console.log("save data");

        let currentDate = new Date();
        let feelings = document.getElementById("feelings");

        let weatherData = {
            date: currentDate.toDateString(),
            time: currentDate.toLocaleTimeString(),
            city: data.name,
            country: data.sys.country,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            feelings: feelings.value
        }
        feelings.value = ''
        console.log(weatherData);

        // call displayWeatherData
        // Post weatherData to route:/lastEntry
        displayWeatherData(weatherData)
            .then(function (){postWeatherData('lastEntry', weatherData).then(() => {

            })});
    }

    // This function is used to display the weatherData in the browser
    const displayWeatherData = async (weatherData) => {
        let msg = document.getElementById("message");
        console.log(weatherData)
        if (weatherData.date === undefined){
            msg.innerHTML = " Please enter zip code and click on the generate button to get your weather forecast!";
            return;
        }
        msg.innerHTML = ''
        let dateInfo = `<p> ${weatherData.date} ${weatherData.time}</p>`
        let dateDiv = document.getElementById("date");
        dateDiv.innerHTML = dateInfo;

        let locationInfo = `<p> ${weatherData.city}, ${weatherData.country}</p>`
        let locationDiv = document.getElementById("location");
        locationDiv.innerHTML = locationInfo;

        let tempInfo = `<img src="${iconPath}${weatherData.icon}@2x.png" alt=""/><p>${Math.floor(weatherData.temp)} &#8457</p>`
        let tempDiv = document.getElementById("temp");
        tempDiv.innerHTML = tempInfo;

        let description = `<p> ${weatherData.description}, feels like: ${Math.floor(weatherData.feelsLike)} &#8457 </p>`
        let descriptionDiv = document.getElementById("description");
        descriptionDiv.innerHTML = description;

        let contentInfo = `<p>humidity: ${weatherData.humidity} &#37, wind speed: ${weatherData.wind} mph </p>`
        let contentDiv = document.getElementById("content");
        contentDiv.innerHTML = contentInfo;

        let myFeelingsInfo = `<p>I am feeling: ${weatherData.feelings} </p>`
        let myFeelingsDiv = document.getElementById("myFeelings");
        myFeelingsDiv.innerHTML = myFeelingsInfo;
    }

    /* Function to GET Web API Data*/

    const getWeatherData = async (url = '', callBack, errorCallBack) => {
        await fetchData(url, callBack, errorCallBack);
    };

    /* Function to POST data */

    const postWeatherData = async (url = '', data = {}) => {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        try {
            return await response.json();
        } catch (error) {
            console.log("error", error);
        }
    };

    /* Function to GET Project Data */

    const getLastSavedEntryData = async (url = '', callBack, errorCallBack) => {
        await fetchData(url, callBack, errorCallBack);
    };

    const fetchData = async (url, callBack, errorCallBack) => {

        try {
            const request = await fetch(url);
            // Transform into JSON
            const data = await request.json()
            // console.log(request);
            if (!request.ok) {
                errorCallBack();
            }
            else{
                callBack(data);
            }
        }
        catch (error) {
            errorCallBack()
            // console.log("error", error);
        }
    }

    function displayErrorMessage(){
        console.log("Zip code provided doesn't exist!.")
        let message = "<p>Zip code provided doesn't exist!</p>"
        let errorMessage = document.getElementById("errorMessage");
        errorMessage.innerHTML = message;
    }


    // Display lastEntry
    function showRecentEntry() {
        console.log("ok")
        getLastSavedEntryData('lastEntry', displayWeatherData, displayErrorMessage).then(() =>{

        });
        // call the function
    }
    showRecentEntry()
    //END
