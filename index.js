const wrapper = document.querySelector('.wrapper'),
    inputPart = wrapper.querySelector('.input-part'),
    inputTxt = inputPart.querySelector('.input-txt'),
    inputField = inputPart.querySelector('input'),
    LocationBtn = inputPart.querySelector('button'),
    wIcons = document.querySelector('.weather-part img'),
    arrowback = document.querySelector('header i');



let api;

// add event listener event in input field
inputField.addEventListener("keyup", e => {
    // if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
});

LocationBtn.addEventListener('click', () => {
    // if device support geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert('Your Device not Support Geolocation Api')
    }
})
function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2c44ea01a45ca7e1685e84b1e39d5530`   //getting let and log of the user device from coord
    fetchData()
}
function onError(error) {
    inputTxt.innerText = error.message
    inputTxt.classList.add('err')
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2c44ea01a45ca7e1685e84b1e39d5530`
    fetchData();
}

function fetchData() {
    inputTxt.innerText = "Getting weather Details..."
    inputTxt.classList.add('pending')
    // getting api response and return it with parsing into js object and in another
    // then functin calling weatherDetail function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => {
        weatherDetail(result)
    })
}

function weatherDetail(info) {
    if (info.cod == "404") {
        inputTxt.classList.replace('pending', 'err')
        inputTxt.innerText = "City Not Found"
    }
    else {
        // let get required properties value from info object
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, temp, humidity } = info.main;

        if (id == 800) {
            wIcons.src = 'Icons/clear.svg'
        } else if (id >= 200 && id <= 232) {
            wIcons.src = 'Icons/storm.sv5'

        } else if (id >= 500 && id <= 531) {
            wIcons.src = 'Icons/rain.svg'

        } else if (id >= 600 && id <= 622) {
            wIcons.src = 'Icons/snow.svg'

        } else if (id >= 701 && id <= 781) {
            wIcons.src = 'Icons/haze.svg'
        } else if (id >= 801 && id <= 804) {
            wIcons.src = 'Icons/cloud.svg'
        } else if (id >= 500 && id <= 531) {
            wIcons.src = 'Icons/rain.svg'
        }

        // let pass these value a particular html element
        wrapper.querySelector('.location span').innerText = `${city},${country}`
        wrapper.querySelector('.weather').innerText = description;
        wrapper.querySelector('.temp .num-2').innerText = feels_like;
        wrapper.querySelector('.temp .num').innerText = Math.floor(temp);
        wrapper.querySelector('.humidity span').innerText = `${humidity}%`;



        inputField.value = '';
        inputTxt.innerText = "Done!"
        setTimeout(() => {
            inputTxt.classList.remove('pending')
        }, 5000);
        wrapper.classList.add('active')
    }
}


// Back Btn function
arrowback.addEventListener('click', () => {
    wrapper.classList.remove('active')
})

